import { Injectable } from '@angular/core';

const STORAGE_KEY = 'partner_context';

export interface PartnerCompanyContext {
  companyId: number;
  companyName: string;
  discountMax: number;
}

@Injectable({ providedIn: 'root' })
export class PartnerContextService {

  private readonly STORAGE_KEY = 'partner_context';

  setCompany(context: PartnerCompanyContext) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
  }

  getCompany(): PartnerCompanyContext | null {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCompany();
  }

  clear() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}