import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'partners',
        loadComponent: () =>
          import('./features/partner/pages/partner-list/partner-list')
            .then(m => m.PartnerListComponent)
      },
      {
        path: 'partner-companies',
        loadComponent: () =>
          import('./features/partner-companies/pages/partner-companies-list/partner-companies-list')
            .then(m => m.PartnerListComponent)
      }
    ]
  }
];
