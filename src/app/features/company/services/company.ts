import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';


@Injectable({ providedIn: 'root' })
export class CompanyService {

  private readonly baseUrl = environment.apiUrl + '/partner-companies';

  constructor(private http: HttpClient) {}

  searchBeneficiary(query: string) {
    return this.http.get<any[]>(`/api/beneficiaries/search?q=${query}`);
  }

  calculateDiscount(dto: any) {
    return this.http.post<any>('/api/discount/calculate', dto);
  }

  confirmDiscount(dto: any) {
    return this.http.post('/api/discount/confirm', dto);
  }
}

