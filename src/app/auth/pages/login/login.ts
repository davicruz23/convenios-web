import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log('[Login] erro', err);
        this.error = 'Email ou senha inválidos';
        this.loading = false;
      }
    });
  }

}
