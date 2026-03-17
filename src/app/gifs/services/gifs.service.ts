import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  
  private httpClient = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  GifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  
  constructor() { this.loadTrendingGifs(); this.loadSearchHistory(); }

  loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory.set(JSON.parse(history));
    }
  }

  

  loadTrendingGifs() {
    return this.httpClient.get<GiphyResponse>(`${environment.apiUrl}/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '20',
      },
    }).subscribe((response) => {
      const gifs = GifMapper.toGifList(response.data);
      this.trendingGifs.set(gifs);
      this.GifsLoading.set(false);
      console.log({gifs});
    });
  }

  searchGifs(searchTerm: string) {

    return this.httpClient.get<GiphyResponse>(`${environment.apiUrl}/search`, {
      params: {
        api_key: environment.apiKey,
        q: searchTerm,
        limit: '20',
      },
    }).pipe(
      map((response) => GifMapper.toGifList(response.data)),
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ...history,
          [searchTerm]: gifs,
        }));
      }),
      tap(() => this.saveOnLocalStorage()),
    );
  }

  getHistoryFor(searchTerm: string): Gif[] {
    return this.searchHistory()[searchTerm] || [];
  }

  saveOnLocalStorage() {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  }

}