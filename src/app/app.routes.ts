import { Routes } from '@angular/router';
import { Home } from './features/home/home';

import { loginGuard } from './core/guards/login.guard';
import { adminGuard } from './core/guards/admin.guard';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login/login')
        .then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    children: [

      {
        path: 'home',
        component: Home,
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
