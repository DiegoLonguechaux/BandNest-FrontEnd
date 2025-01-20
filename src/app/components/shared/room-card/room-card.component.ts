import { Component } from '@angular/core';
import { RoomService } from '../../../services/roomService/room.service';
import { RoomModel } from '../../../models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  rooms: RoomModel[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }
}
