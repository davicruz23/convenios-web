import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { decodeJwtPayload } from '../../utils/jwt.util';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('[Interceptor] URL:', req.url);

    if (req.url.includes('/auth/login')) {
      console.log('[Interceptor] Login request, passando direto');
      return next.handle(req);
    }

    const token = sessionStorage.getItem('auth_token');
    console.log('[Interceptor] Token:', token);

    if (!token) {
      console.log('[Interceptor] Sem token');
      return next.handle(req);
    }

    try {
      const payload = decodeJwtPayload(token);
      const now = Math.floor(Date.now() / 1000);

      console.log('[Interceptor] Payload:', payload);

      if (payload.exp < now) {
        console.log('[Interceptor] Token expirado');
        sessionStorage.clear();
        location.href = '/login';
      }
    } catch (e) {
      console.log('[Interceptor] Erro no token', e);
      sessionStorage.clear();
      location.href = '/login';
    }

    console.log('[Interceptor] Enviando Authorization header');

    return next.handle(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    );
  }
}
