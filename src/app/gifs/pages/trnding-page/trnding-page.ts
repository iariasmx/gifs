import { AfterViewInit, Component, ElementRef, inject, output, viewChild } from '@angular/core';
import { GifList } from "@app/gifs/components/gif-list/gif-list";
import { GifService } from '@app/gifs/services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll.state.service';


@Component({
  selector: 'app-trnding-page',
  // imports: [GifList],
  templateUrl: './trnding-page.html'
})
export class TrndingPage implements AfterViewInit {

  gifService = inject(GifService);
  ScrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.ScrollStateService.trendingScrollPosition();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
    if (scrollTop + clientHeight + 300 >= scrollHeight) {
      console.log('Scrolled to the bottom!');
      // Aquí puedes cargar más GIFs o realizar cualquier acción que desees
      this.gifService.loadTrendingGifs();
    }
    this.ScrollStateService.trendingScrollPosition.set(scrollTop);
  }
}
