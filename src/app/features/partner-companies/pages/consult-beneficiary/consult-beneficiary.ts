import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerContextService, PartnerCompanyContext } from '../../services/partner-context.service';
import { PartnerService } from '../../../partner/services/partner.service';
import { Partner } from '../../../../shared/models/partner.model';

@Component({
  selector: 'app-consult-beneficiary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consult-beneficiary.html',
  styleUrl: './consult-beneficiary.scss'
})
export class ConsultBeneficiaryComponent implements OnInit {

  search = '';
  company: PartnerCompanyContext | null = null;

  loading = false;
  results: Partner[] = [];
  error = '';

  constructor(
    private contextService: PartnerContextService,
    private partnerService: PartnerService
  ) {}

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
    // próximo passo: navegar para apply-discount
  }
}
