import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partner } from '../../../../shared/models/partner.model';
import { PartnerService } from '../../../partner/services/partner.service';
import { CompanyContext, CompanyContextService } from '../../services/company-context-service';

@Component({
  selector: 'app-beneficiary-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './beneficiary-search.html',
  styleUrl: './beneficiary-search.scss'
})
export class BeneficiarySearchComponent {

  search = '';
  company: CompanyContext | null = null;

  loading = false;
  results: Partner[] = [];
  error = '';

  constructor(
    private contextService: CompanyContextService,
    private partnerService: PartnerService
  ) { }

  ngOnInit(): void {
    this.company = this.contextService.getCompany();
  }

  onSearchChange(): void {
    this.error = '';

    if (!this.search || this.search.trim().length < 2) {
      this.results = [];
      return;
    }

    this.loading = true;

    this.partnerService.search(this.search.trim()).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao buscar beneficiário';
        this.loading = false;
      }
    });
  }

  selectBeneficiary(beneficiary: Partner): void {
    console.log('Selecionado:', beneficiary);
  }
}

