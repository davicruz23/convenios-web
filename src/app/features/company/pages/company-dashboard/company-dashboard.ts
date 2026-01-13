import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BeneficiarySearchComponent } from '../../components/beneficiary-search/beneficiary-search';
import { DiscountModalComponent } from '../../components/discount-modal/discount-modal';

import { CompanyContext, CompanyContextService } from '../../services/company-context-service';
import { AuthService } from '../../../../auth/services/auth.service';

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
export class CompanyDashboardComponent implements OnInit {

  company: CompanyContext | null = null;
  selectedBeneficiary: any = null;

  constructor(
    private contextService: CompanyContextService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.company = this.contextService.getCompany();
  }

  openDiscountModal(beneficiary: any): void {
    this.selectedBeneficiary = beneficiary;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
