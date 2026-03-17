import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage),
    children: [
      {path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page').then(m => m.SearchPage)
      },
      {path: 'trending',
        loadComponent: () => import('./gifs/pages/trnding-page/trnding-page').then(m => m.TrndingPage)
      },
      {path: 'history/:query',
        loadComponent: () => import('./gifs/pages/gif-history/gif-history').then(m => m.GifHistory)
      },
      {path: '**', redirectTo: 'trending' }
    ]
  },
  {path: '**', redirectTo: 'dashboard' }
];
