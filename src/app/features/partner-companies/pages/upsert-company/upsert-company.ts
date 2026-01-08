import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';

import { CompaniesService } from '../../services/partner-companies.service';
import { PartnerCompanyRequest } from '../../../../shared/models/partner-company-request.model';

@Component({
  standalone: true,
  selector: 'app-upsert-company',
  imports: [CommonModule, FormsModule],
  templateUrl: './upsert-company.html',
  styleUrl: './upsert-company.scss',
})
export class UpsertCompany {

  loading = false;

  company: PartnerCompanyRequest = {
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    maxDiscount: 0,
    address: {
      street: '',
      houseNumber: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  };


  constructor(
    private service: CompaniesService,
    private cdr: ChangeDetectorRef
  ) { }

  submit() {
    if (!this.isFormValid) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    this.loading = true;

    this.service.create(this.company).subscribe({
      next: () => {
        alert('Empresa parceira cadastrada com sucesso!');
        this.resetForm();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erro ao cadastrar empresa');
        this.loading = false;
      }
    });
  }

  get isFormValid(): boolean {
    const a = this.company.address;

    return !!(
      this.company.name?.trim() &&
      this.company.cnpj?.trim() &&
      this.company.phone?.trim() &&
      this.company.maxDiscount !== null &&
      a.street?.trim() &&
      a.houseNumber?.trim() &&
      a.city?.trim() &&
      a.state?.trim() &&
      a.zip?.trim() &&
      a.country?.trim()
    );
  }

  private resetForm() {
    this.company = {
      name: '',
      cnpj: '',
      phone: '',
      email: '',
      maxDiscount: 0,
      address: {
        street: '',
        houseNumber: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    };
  }
}
