import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private httpClient = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  GifsLoading = signal<boolean>(false);
  private currentPage = signal<number>(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

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

    if (this.GifsLoading()) return;
    this.GifsLoading.set(true);

    return this.httpClient.get<GiphyResponse>(`${environment.apiUrl}/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '20',
        offset: (this.currentPage() * 20).toString(),
      },
    }).subscribe((response) => {
      const gifs = GifMapper.toGifList(response.data);
      this.trendingGifs.update((prevGifs) => [...prevGifs, ...gifs]);
      this.GifsLoading.set(false);
      this.currentPage.update((page) => page + 1);

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
