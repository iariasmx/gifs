import { Component, input } from '@angular/core';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list-component',
  imports: [],
  templateUrl: './gif-list-component.html'
})
export class GifListComponent {

  gif = input.required<Gif>()
 }
