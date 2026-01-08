import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PartnerContextService } from '../services/partner-context.service';

@Injectable({ providedIn: 'root' })
export class PartnerAuthGuard implements CanActivate {

  constructor(
    private context: PartnerContextService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.context.isAuthenticated()) {
      this.router.navigate(['/partner/access']);
      return false;
    }
    return true;
  }
}
