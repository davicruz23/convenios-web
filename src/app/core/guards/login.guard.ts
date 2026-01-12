import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const loginGuard: CanActivateFn = () => {

  console.log('[LoginGuard] executando');

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('[LoginGuard] já autenticado');

    if (authService.getRole() === 'ROLE_ADMIN') {
      router.navigate(['/home']);
    }

    return false;
  }

  return true;
};
