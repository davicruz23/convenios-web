import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { CalculateDiscountDTO } from '../../../shared/dtos/calculate-discount.dto';
import { ConfirmDiscountDTO } from '../../../shared/dtos/confirm-discount.dto';

@Injectable({ providedIn: 'root' })
export class ConventionService {

    private readonly baseUrl = environment.apiUrl + '/convention-usage';

    constructor(private http: HttpClient) { }

    calculateDiscount(dto: CalculateDiscountDTO): Observable<number> {
        return this.http.post<number>(
            `${this.baseUrl}/calculate`,
            dto
        );
    }

    confirmDiscount(dto: ConfirmDiscountDTO): Observable<void> {
        return this.http.post<void>(
            `${this.baseUrl}/confirm`,
            dto
        );
    }
}
