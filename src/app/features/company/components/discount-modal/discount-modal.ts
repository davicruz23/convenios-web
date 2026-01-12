import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanyService } from '../../services/company';

@Component({
  selector: 'app-discount-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discount-modal.html'
})
export class DiscountModalComponent {

  @Input() beneficiary!: any;
  @Output() close = new EventEmitter<void>();

  today = new Date();
  procedureId!: number;
  discount?: number;

  constructor(private service: CompanyService) {}

  calculate() {
    if (!this.procedureId) return;

    this.service.calculateDiscount({
      beneficiaryId: this.beneficiary.id,
      procedureId: this.procedureId
    }).subscribe(res => {
      this.discount = res.discount;
    });
  }

  confirm() {
    this.service.confirmDiscount({
      beneficiaryId: this.beneficiary.id,
      procedureId: this.procedureId
    }).subscribe(() => {
      this.close.emit();
    });
  }
}
