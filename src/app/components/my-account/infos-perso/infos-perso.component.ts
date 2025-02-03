import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../services/userService/user.service';
import { UserModel } from '../../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infos-perso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './infos-perso.component.html',
  styleUrl: './infos-perso.component.css'
})
export class InfosPersoComponent implements OnInit {
  private userService = inject(UserService);

  user = signal<UserModel | null>(null);
  userDatas: Partial<UserModel> = {};
  isLoading = computed(()=>this.user() == null);
  isEditing = signal(false);

  ngOnInit(): void {
    this.userService.getUser().subscribe((response) => {
      this.user.set(response.data);
      this.userDatas = {...response.data};
    }
    );
  }

  // modification du formulaire
  enableEditing(): void {
    this.isEditing.set(true);
  }

  // annuler modification
  cancelEditing(): void {
    if (this.user()) {
      this.userDatas = { ...this.user()! };
    }
    this.isEditing.set(false);
  }

  saveChanges(form: NgForm): void {
    if (form.valid) {
      // 🔥 Appelle le service pour mettre à jour l'utilisateur
      this.userService.updateUser(this.userDatas).subscribe(
        (updatedUser) => {
          this.user.set(updatedUser); // Met à jour l'affichage avec les nouvelles données
          this.isEditing.set(false);
        },
        (error) => {
          console.error("Erreur lors de la mise à jour :", error);
        }
      );
    }
  }
}
