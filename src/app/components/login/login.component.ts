import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

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
    }
  }
}
