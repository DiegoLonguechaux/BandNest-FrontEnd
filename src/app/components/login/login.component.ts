import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form: any): void {
    if (form.valid) {
      this.authService.login(this.credentials).subscribe({
        next: () => {
          // Redirige l'utilisateur après un login réussi
          this.router.navigate(['/my-account']);
        },
        error: (err) => {
          // Affiche un message d'erreur si la connexion échoue
          this.errorMessage = 'Échec de la connexion. Vérifiez vos identifiants.';
          console.error(err);
        },
      });
    }
  }
}
