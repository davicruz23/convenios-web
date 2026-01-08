import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ConsultBeneficiaryComponent } from './features/partner-companies/pages/consult-beneficiary/consult-beneficiary';

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
      },
      {
        path: 'upsert-partner',
        loadComponent: () =>
          import('./features/partner/pages/upsert-partner/upsert-partner')
            .then(m => m.UpsertPartnerComponent)
      },
      {
        path: 'upsert-company',
        loadComponent: () =>
          import('./features/partner-companies/pages/upsert-company/upsert-company')
            .then(m => m.UpsertCompany)
      },
      {
        path: 'partner/access',
        loadComponent: () =>
          import('./features/partner-companies/pages/partner-access/partner-access')
            .then(m => m.PartnerAccessComponent)
      },
      {
        path: 'partner/consult-beneficiary',
        component: ConsultBeneficiaryComponent
      }

    ]
  }
];
