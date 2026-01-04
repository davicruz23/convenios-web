import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesService } from '../../services/partner-companies.service';
import { PartnerCompany } from '../../../../shared/models/partner-company.model';
import { time } from 'console';

@Component({
  standalone: true,
  selector: 'app-partner-companies-list',
  templateUrl: './partner-companies-list.html',
  styleUrl: './partner-companies-list.scss',
  imports: [CommonModule]
})
export class PartnerListComponent {

  partnerCompanies: PartnerCompany[] = [];

  constructor(
    private service: CompaniesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPartnerCompanies();
  }

  loadPartnerCompanies() {
    this.service.findAll().subscribe({
      next: (data) => {
        this.partnerCompanies = data;
        this.cdr.detectChanges();
      }
    });
  }

  confirmDelete(id: number) {
    const confirmed = confirm('Deseja realmente excluir esta empresa?');

    if (!confirmed) {
      return;
    }

    this.deleteCompany(id);
  }

  deleteCompany(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.partnerCompanies = this.partnerCompanies.filter(c => c.id !== id);
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erro ao excluir empresa!');
      }
    });
  }
}

