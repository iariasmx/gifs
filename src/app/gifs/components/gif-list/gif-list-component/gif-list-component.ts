import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-component',
  imports: [],
  templateUrl: './gif-list-component.html'
})
export class GifListComponent {

  imgUrl = input.required<string>()
 }
