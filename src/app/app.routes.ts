import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { adminGuard } from './core/guards/admin.guard';
import { companyGuard } from './core/guards/company-guard';

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
        loadComponent: () =>
          import('./features/home/home')
            .then(m => m.Home)
      },

      {
        path: 'partners',
        loadComponent: () =>
          import('./features/partner/pages/partner-list/partner-list')
            .then(m => m.PartnerListComponent)
      },

      {
        path: 'upsert-partner',
        loadComponent: () =>
          import('./features/partner/pages/upsert-partner/upsert-partner')
            .then(m => m.UpsertPartnerComponent)
      },

      {
        path: 'partner-companies',
        loadComponent: () =>
          import('./features/partner-companies/pages/partner-companies-list/partner-companies-list')
            .then(m => m.PartnerListComponent)
      },

      {
        path: 'upsert-company',
        loadComponent: () =>
          import('./features/partner-companies/pages/upsert-company/upsert-company')
            .then(m => m.UpsertCompany)
      },
    ]
  },

  {
    path: 'company-dashboard',
    loadComponent: () =>
      import('./features/company/pages/company-dashboard/company-dashboard')
        .then(m => m.CompanyDashboardComponent),
    canActivate: [companyGuard]
  },

  {
    path: 'company/upsert',
    loadComponent: () =>
      import('./features/company/pages/company-dashboard/company-dashboard')
        .then(m => m.CompanyDashboardComponent),
    canActivate: [companyGuard]
  }

];
