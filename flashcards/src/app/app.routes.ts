import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page'),
  },
  {
    path: 'session',
    loadComponent: () => import('./pages/session/session.page'),
  },
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
