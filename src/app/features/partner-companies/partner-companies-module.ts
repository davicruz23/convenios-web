import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerListComponent } from './pages/partner-companies-list/partner-companies-list';
import { PartnerCompaniesRoutingModule } from './partner-companies-routing-module';

@NgModule({
  imports: [
    CommonModule,
    PartnerCompaniesRoutingModule,
    PartnerListComponent
  ]
})
export class PartnersModule {}

