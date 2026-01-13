import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyContext, CompanyContextService } from '../../../features/company/services/company-context-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private companyContext: CompanyContextService,
    private router: Router
  ) { }

  submit(): void {
    console.log('[Login] submit');

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        console.log('[Login] sucesso', res);

        const token = res.token;

        localStorage.setItem('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        if (role === 'ROLE_COMPANY') {

          this.companyContext.setCompany({
            companyName: payload.companyName,
            companyId: payload.companyId
          });
          this.router.navigate(['/company-dashboard']);
          return;
        }

        this.router.navigate(['/home']);
      },
    });
  }
}
