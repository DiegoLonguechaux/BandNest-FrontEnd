import { Component } from '@angular/core';
import { NavAccountComponent } from './nav-account/nav-account.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [NavAccountComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

}
