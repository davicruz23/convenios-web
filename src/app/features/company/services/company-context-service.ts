import { Injectable } from '@angular/core';

export interface CompanyContext {
  companyId: number;
  companyName: string;
}

@Injectable({ providedIn: 'root' })
export class CompanyContextService {

  private readonly STORAGE_KEY = 'company_context';

  setCompany(context: CompanyContext): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
  }

  getCompany(): CompanyContext | null {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  getCompanyId(): number | null {
    return this.getCompany()?.companyId ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.getCompany();
  }

  clear(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
