import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Partner } from '../../../shared/models/partner.model';
import { PartnerRequest } from '../../../shared/models/partner-request.model';
import { HolderWithPartners } from '../../../shared/models/holder-with-partners.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private readonly baseUrl = environment.apiUrl + '/partner';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.baseUrl);
  }


  // GET /api/partner/{holderId}/grouped-dependents
  findGroupedDependents(holderId: number): Observable<HolderWithPartners> {
    return this.http.get<HolderWithPartners>(
      `${this.baseUrl}/${holderId}/grouped-dependents`
    );
  }

  createHolder(dto: PartnerRequest): Observable<number> {
    return this.http.post<number>(
      `${this.baseUrl}/createHolder`,
      dto
    );
  }


  // POST /api/partner/{holderId}/createDependent
  createDependent(holderId: number, dto: PartnerRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${holderId}/createDependent`,
      dto
    );
  }

  search(query: string): Observable<Partner[]> {
    return this.http.get<Partner[]>(
      `${this.baseUrl}/search`,
      { params: { q: query } }
    );
  }

}
