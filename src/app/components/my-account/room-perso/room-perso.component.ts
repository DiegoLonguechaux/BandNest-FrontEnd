import { Component } from '@angular/core';
import { RoomCardComponent } from '../../shared/room-card/room-card.component';

@Component({
  selector: 'app-room-perso',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './room-perso.component.html',
  styleUrl: './room-perso.component.css'
})
export class RoomPersoComponent {

}
