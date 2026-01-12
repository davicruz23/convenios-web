import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiarySearchComponent } from '../../components/beneficiary-search/beneficiary-search';
import { DiscountModalComponent } from '../../components/discount-modal/discount-modal';

@Component({
  standalone: true,
  selector: 'app-company-dashboard',
  imports: [
    CommonModule,
    BeneficiarySearchComponent,
    DiscountModalComponent
  ],
  templateUrl: './company-dashboard.html',
  styleUrls: ['./company-dashboard.scss']
})
export class CompanyDashboardComponent {

  selectedBeneficiary: any = null;

  openDiscountModal(beneficiary: any) {
    this.selectedBeneficiary = beneficiary;
  }
}
