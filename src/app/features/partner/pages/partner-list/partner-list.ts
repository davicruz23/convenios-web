import { Component, OnInit } from '@angular/core';
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
export class PartnerListComponent implements OnInit {

  partners: PartnerResponse[] = [];

  constructor(private service: PartnerService) { }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.service.findAll().subscribe({
      next: (data) => {
        this.partners = data;
      }

    });
  }
}
