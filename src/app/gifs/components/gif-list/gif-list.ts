import { Component, input } from '@angular/core';
import { GifListComponent } from "./gif-list-component/gif-list-component";
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListComponent],
  templateUrl: './gif-list.html',
})
export class GifList {

  gifs = input.required<Gif[]>()
  loading = input.required<boolean>()
}
