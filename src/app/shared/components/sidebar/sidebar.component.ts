import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarItem {
  label: string;
  route: string;
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
    // {
    //   label: 'Usuários',
    //   route: '/partners',
    // },
    {
      label: 'Clientes',
      route: '/partners',
    },
    {
      label: 'Empresas',
      route: 'partner-companies',
    }
    // {
    //   label: 'Plans',
    //   route: '/plans',
    // },
    // {
    //   label: 'Relatórios',
    //   route: '',
    //   children: [
    //     { label: 'Resumo', route: '/reports/summary' },
    //     { label: 'Detalhado', route: '/reports/detail' },
    //   ],
    // },
  ];


  toggle(menuLabel: string) {
    this.activeMenu = this.activeMenu === menuLabel ? null : menuLabel;
  }
}
