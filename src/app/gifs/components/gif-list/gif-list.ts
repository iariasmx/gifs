import { Component, input } from '@angular/core';
import { GifListComponent } from "./gif-list-component/gif-list-component";

@Component({
  selector: 'gif-list',
  imports: [GifListComponent],
  templateUrl: './gif-list.html',
})
export class GifList {

  gifs = input.required<string[]>()
}
