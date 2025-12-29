import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing-module';
import { PartnerListComponent } from './pages/partner-list/partner-list';

@NgModule({
  imports: [
    CommonModule,
    PartnersRoutingModule,
    PartnerListComponent
  ]
})
export class PartnersModule {}

