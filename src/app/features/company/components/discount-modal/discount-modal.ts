import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConventionService } from '../../services/convention-usage-service';
import { CompanyContextService } from '../../services/company-context-service';
import { ConfirmDiscountDTO } from '../../../../shared/dtos/confirm-discount.dto';
import { CalculateDiscountDTO } from '../../../../shared/dtos/calculate-discount.dto';

@Component({
  selector: 'app-discount-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discount-modal.html',
  styleUrl: './discount-modal.scss'
})
export class DiscountModalComponent {

  @Input() beneficiary!: any; // partner
  @Output() close = new EventEmitter<void>();

  today = new Date();

  procedureName = '';
  discount?: number;
  loading = false;
  error = '';

  private companyId!: number;

  constructor(
    private service: ConventionService,
    private contextService: CompanyContextService
  ) {}

  ngOnInit(): void {
    const company = this.contextService.getCompany();

    if (!company) {
      this.error = 'Empresa não encontrada no contexto';
      return;
    }

    this.companyId = company.companyId;
  }

  /** Apenas calcula */
  calculate(): void {
    if (
      !this.beneficiary?.id ||
      !this.procedureName.trim() ||
      this.loading
    ) return;

    this.loading = true;
    this.error = '';

    const dto: CalculateDiscountDTO = {
      partnerId: this.beneficiary.id,
      companyId: this.companyId
    };

    this.service.calculateDiscount(dto).subscribe({
      next: discount => {
        this.discount = discount;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao calcular desconto';
        this.loading = false;
      }
    });
  }

  /** Confirma e salva */
  confirm(): void {
    if (
      !this.beneficiary?.id ||
      !this.procedureName.trim() ||
      this.discount == null ||
      this.loading
    ) return;

    this.loading = true;

    const dto: ConfirmDiscountDTO = {
      partnerId: this.beneficiary.id,
      companyId: this.companyId,
      procedureName: this.procedureName.trim(),
      discount: this.discount
    };

    this.service.confirmDiscount(dto).subscribe({
      next: () => this.close.emit(),
      error: () => {
        this.error = 'Erro ao confirmar desconto';
        this.loading = false;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
