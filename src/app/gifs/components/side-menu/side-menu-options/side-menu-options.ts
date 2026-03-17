import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from '@app/gifs/services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  description: string;
  route: string;}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html'
})
export class SideMenuOptions {

  //Inyectar el servicio de Gifs
  gifService = inject(GifService);
  
  options: MenuOption[] = [

    {
      icon: 'fa-solid fa-search',
      label: 'Search',
      description: 'Search for GIFs',
      route: '/dashboard/search'
    },
    {
      icon: 'fa-solid fa-fire',
      label: 'Trending',
      description: 'See trending GIFs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-heart',
      label: 'Favorites',
      description: 'View your favorite GIFs',
      route: '/dashboard/favorites'
    }
  ];
}
