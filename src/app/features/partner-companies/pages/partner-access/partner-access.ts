import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CompaniesService } from '../../services/partner-companies.service';
import { PartnerContextService } from '../../services/partner-context.service';
import { PartnerCompany } from '../../../../shared/models/partner-company.model';

@Component({
  standalone: true,
  selector: 'app-partner-access',
  imports: [CommonModule],
  templateUrl: './partner-access.html',
  styleUrl: './partner-access.scss',
})
export class PartnerAccessComponent implements OnInit {

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companiesService: CompaniesService,
    private contextService: PartnerContextService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // 🔒 SE JÁ TEM CONTEXTO, NÃO VALIDA TOKEN DE NOVO
    if (this.contextService.isAuthenticated()) {
      this.router.navigate(['/partner/consult-beneficiary']);
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.error = 'Token não informado';
      this.loading = false;
      return;
    }

    this.companiesService.validateToken(token).subscribe({
    next: (company) => {
      this.contextService.setCompany({
        companyId: company.id,
        companyName: company.name,
        discountMax: company.maxDiscount
      });

      this.router.navigateByUrl('/partner/consult-beneficiary');
    },
    error: () => {
      this.router.navigate(['/partner/invalid-access']);
    }
  });
  }

}
