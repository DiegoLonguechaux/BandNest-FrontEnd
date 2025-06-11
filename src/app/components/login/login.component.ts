import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;
  isPasswordVisible : boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form: any): void {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          this.router.navigate(['/my-account']);
        },
        error: (err) => {
          this.errorMessage = 'Échec de la connexion. Vérifiez vos identifiants.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.log('test')
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
