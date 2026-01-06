import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PartnerCompany } from '../../../shared/models/partner-company.model';
import { PartnerRequest } from '../../../shared/models/partner-request.model';
import { HolderWithPartners } from '../../../shared/models/holder-with-partners.model';
import { environment } from '../../../../environments/environments';
import { PartnerCompanyRequest } from '../../../shared/models/partner-company-request.model';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    private readonly baseUrl = environment.apiUrl + '/partner-companies';

    constructor(private http: HttpClient) { }

    findAll(): Observable<PartnerCompany[]> {
        return this.http.get<PartnerCompany[]>(this.baseUrl);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    create(dto: PartnerCompanyRequest): Observable<PartnerCompanyRequest> {
        return this.http.post<PartnerCompanyRequest>(
            `${this.baseUrl}/create-company`,
            dto
        );
    }


}