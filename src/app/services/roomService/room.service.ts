import { inject, Injectable, signal } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pagination } from '../../models/pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly http = inject(HttpClient);
  
  constructor() { }

  getRooms(): Observable<Pagination<RoomModel[]>> {
    return this.http.get<Pagination<RoomModel[]>>(`${environment.apiUrl}/rooms`);
  }

  getRoomById(roomId: number): Observable<{data: RoomModel}> {
    return this.http.get<{data: RoomModel}>(`${environment.apiUrl}/rooms/${roomId}`);
  }

  createRoom(room: RoomModel): Observable<RoomModel> {
    return this.http.post<RoomModel>(`${environment.apiUrl}/rooms`, room);
  }

  updateRoom(roomId: number, room: RoomModel): Observable<RoomModel> {
      return this.http.patch<RoomModel>(`${environment.apiUrl}/rooms/${roomId}`, room);
  }
}