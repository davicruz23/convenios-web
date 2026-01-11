import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { decodeJwtPayload } from '../../utils/jwt.util';

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

  constructor(private http: HttpClient) { }

  login(dto: LoginRequest): Observable<LoginResponse> {
    console.log('[AuthService] chamando API', dto);

    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, dto)
      .pipe(
        tap(res => {
          console.log('[AuthService] resposta', res);
          sessionStorage.setItem('auth_token', res.token);
        })
      );
  }


  logout(): void {
    sessionStorage.clear();
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
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


  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }
}
