import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/userService/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){}
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

  selectedValue = 'default'
  onSelectAction(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
  
    if (value === 'profile') {
      this.router.navigate(['/my-account']);
    } else if (value === 'logout') {
      // this.authService.logout(); // À adapter à ton service
    }
    this.selectedValue = 'default';
  }
  

}
