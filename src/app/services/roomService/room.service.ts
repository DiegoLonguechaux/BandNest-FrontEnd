import { inject, Injectable, signal } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pagination } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly http = inject(HttpClient);
  // private rooms = signal<RoomModel[]>([]);
  private readonly url = 'http://localhost/api/rooms';
  
  // private rooms : RoomModel [] = [
  //   { id: 1, name: 'Salle A', address: '2 rue des Tulipes ', surface: 50, price: 20 },
  //   { id: 2, name: 'Salle B', address: '2 rue des Tulipes ', surface: 20, price: 20 },
  //   { id: 3, name: 'Salle C', address: '2 rue des Tulipes ', surface: 30, price: 20 },
  // ];

  constructor() { }

  getRooms(): Observable<Pagination<RoomModel[]>> {
    return this.http.get<Pagination<RoomModel[]>>(this.url);
  }
}