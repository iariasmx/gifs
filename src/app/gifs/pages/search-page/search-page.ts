import { Component, inject, signal } from '@angular/core';
import { GifList } from "@app/gifs/components/gif-list/gif-list";
import { Gif } from '@app/gifs/interfaces/gif.interface';
import { GifService } from '@app/gifs/services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html'
})
export class SearchPage {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(searchTerm: string) {
    
    searchTerm = searchTerm.trim().toLowerCase();
    if (searchTerm.length === 0) return;
    console.log(searchTerm);
    this.gifService.searchGifs(searchTerm).subscribe((gifs) => {
      console.log(gifs);
      this.gifs.set(gifs);
    });
  }
 }
