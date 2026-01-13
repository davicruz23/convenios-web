import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { decodeJwtPayload } from '../../utils/jwt.util';
import { CompanyContextService } from '../../features/company/services/company-context-service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly baseUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private companyContextService: CompanyContextService
  ) {}

  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, dto)
      .pipe(
        tap(res => {
          sessionStorage.setItem('auth_token', res.token);

          const payload = decodeJwtPayload(res.token);

          if (payload.companyId && payload.companyName) {
            this.companyContextService.setCompany({
              companyId: payload.companyId,
              companyName: payload.companyName
            });
          }
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = decodeJwtPayload(token);
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  logout(): void {
    sessionStorage.clear();
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = decodeJwtPayload(token);
      return payload.role ?? null;
    } catch {
      return null;
    }
  }
}
