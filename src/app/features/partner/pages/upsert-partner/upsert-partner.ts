import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Component } from '@angular/core';

import { PartnerService } from '../../services/partner.service';
import { PartnerRequest } from '../../../../shared/models/partner-request.model';

@Component({
  standalone: true,
  selector: 'app-upsert-partner',
  imports: [CommonModule, FormsModule],
  templateUrl: './upsert-partner.html',
  styleUrl: './upsert-partner.scss',
})
export class UpsertPartnerComponent {

  loading = false;

  holder = {
    name: '',
    cpf: '',
    phone: '',
    address: {
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
      state: '',
      country: ''
    }
  };

  dependents: PartnerRequest[] = [];

  constructor(private service: PartnerService) { }

  addDependent() {
    this.dependents.push({
      name: '',
      cpf: '',
      phone: '',
      isHolder: false,
      holderId: undefined,
      address: {
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
        state: '',
        country: ''
      }
    });
  }


  removeDependent(index: number) {
    this.dependents.splice(index, 1);
  }

  submit() {
    if (!this.isHolderValid) {
      alert('Preencha todos os dados do titular');
      return;
    }
    this.loading = true;

    this.service.createHolder({
      ...this.holder,
      isHolder: true,
      holderId: undefined
    }).subscribe({
      next: (holderId) => {
        this.createDependents(holderId);
      },
      error: () => {
        alert('Erro ao criar titular');
        this.loading = false;
      }
    });
  }

  private createDependents(holderId: number) {
    if (this.dependents.length === 0) {
      this.finish();
      return;
    }

    let created = 0;

    this.dependents.forEach(dep => {

      const hasAddress =
        dep.address &&
        (
          dep.address.street?.trim() ||
          dep.address.houseNumber?.trim() ||
          dep.address.city?.trim() ||
          dep.address.state?.trim() ||
          dep.address.zip?.trim() ||
          dep.address.country?.trim()
        );

      this.service.createDependent(holderId, {
        ...dep,
        isHolder: false,
        holderId,
        address: hasAddress ? dep.address : undefined
      }).subscribe({
        next: () => {
          created++;
          if (created === this.dependents.length) {
            this.finish();
          }
        },
        error: () => {
          alert('Erro ao criar dependente');
          this.loading = false;
        }
      });
    });
  }


  private finish() {
    alert('Titular e dependentes salvos com sucesso!');
    this.loading = false;
    this.resetForm();
  }

  get isHolderValid(): boolean {
    const a = this.holder.address;

    return !!(
      this.holder.name?.trim() &&
      this.holder.cpf?.trim() &&
      this.holder.phone?.trim() &&
      a.street?.trim() &&
      a.houseNumber?.trim() &&
      a.city?.trim() &&
      a.state?.trim() &&
      a.zip?.trim() &&
      a.country?.trim()
    );
  }

  private resetForm() {
    this.holder = {
      name: '',
      cpf: '',
      phone: '',
      address: {
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
        state: '',
        country: ''
      }
    };

    this.dependents = [];
  }

  toggleDependentAddress(dep: PartnerRequest) {
    if (dep.address) {
      dep.address = undefined;
    } else {
      dep.address = {
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
        state: '',
        country: ''
      };
    }
  }


}
