import { Injectable } from '@angular/core';
import { RoomModel } from '../../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private rooms : RoomModel [] = [
    { id: 1, name: 'Salle A', address: '2 rue des Tulipes ', surface: 50, price: 20 },
    { id: 2, name: 'Salle B', address: '2 rue des Tulipes ', surface: 20, price: 20 },
    { id: 3, name: 'Salle C', address: '2 rue des Tulipes ', surface: 30, price: 20 },
  ];

  constructor() { }

  getRooms(): RoomModel[] {
    return this.rooms;
  }
}