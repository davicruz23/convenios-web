import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarItem {
  label: string;
  route?: string;
  icons?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  activeMenu: string | null = null;

  menu: SidebarItem[] = [
    {
      label: 'Beneficiários',
      children: [
        {
          label: 'Listar',
          route: '/partners'
        },
        {
          label: 'Novo Beneficiário',
          route: '/upsert-partner'
        }
      ]
    },
    {
      label: 'Parceiros',
      route: '/partner-companies'
    }
  ];



  toggle(menuLabel: string) {
    this.activeMenu = this.activeMenu === menuLabel ? null : menuLabel;
  }
}
