import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentials = { firstname:'', lastname: '', name: '', email: '', password: '', password_confirmation:'', role: 'musician' };
  errorMessage = '';
  isLoading = false;
  isOwner = false;

  constructor(private authService: AuthService, private router: Router){}

  onRoleChange(event: any): void {
    this.isOwner = event.target.checked;
    this.credentials.role = this.isOwner ? 'owner' : 'musician';
  }
  
  onSubmit(form: any): void {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.register(this.credentials).subscribe({
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
