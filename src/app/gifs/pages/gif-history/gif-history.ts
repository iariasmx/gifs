import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '@app/gifs/services/gifs.service';
import { map } from 'rxjs';
import { GifList } from "@app/gifs/components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  templateUrl: './gif-history.html',
  imports: [GifList]
})
export class GifHistory { 

  query = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['query'])));
  gifsService = inject(GifService);
  gifsByQuery = computed(() => this.gifsService.getHistoryFor(this.query() || ''));


  
}
