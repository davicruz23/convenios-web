import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { CompanyContextService } from "../services/company-context-service";

@Injectable({ providedIn: 'root' })
export class CompanyAuthGuard implements CanActivate {

  constructor(
    private context: CompanyContextService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.context.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
