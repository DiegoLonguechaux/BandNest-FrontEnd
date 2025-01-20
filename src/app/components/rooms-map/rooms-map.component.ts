import { Component } from '@angular/core';
import { RoomCardComponent } from '../shared/room-card/room-card.component';

@Component({
  selector: 'app-rooms-map',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './rooms-map.component.html',
  styleUrl: './rooms-map.component.css'
})
export class RoomsMapComponent {

}
