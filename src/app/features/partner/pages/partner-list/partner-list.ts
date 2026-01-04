import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerService } from '../../services/partner.service';
import { PartnerResponse } from '../../../../shared/models/partner-response.model';

@Component({
  standalone: true,
  selector: 'app-partner-list',
  templateUrl: './partner-list.html',
  styleUrl: './partner-list.scss',
  imports: [CommonModule]
})
export class PartnerListComponent {

  partners: PartnerResponse[] = [];

  openHolderId: number | null = null;

  constructor(
    private service: PartnerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.service.findAll().subscribe({
      next: (data) => {
        this.partners = data;
        this.cdr.detectChanges();
      }
    });
  }

  toggle(holderId: number) {
    this.openHolderId = this.openHolderId === holderId ? null : holderId;
  }

  getDependents(holderId: number) {
    return this.partners.filter(p => !p.isHolder && p.holderId === holderId);
  }
}

