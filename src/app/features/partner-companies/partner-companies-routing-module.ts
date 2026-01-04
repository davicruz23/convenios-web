import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerListComponent } from './pages/partner-companies-list/partner-companies-list';

const routes: Routes = [
  {
    path: '',
    component: PartnerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerCompaniesRoutingModule { }
