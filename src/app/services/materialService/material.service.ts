import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MaterialModel } from '../../models/material.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly http = inject(HttpClient);

  constructor() { }

  addEquipment(equipment: MaterialModel[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/materials`, { equipment }); // Envoi direct
  }
  // addEquipment(roomId: number, equipment: MaterialModel[]): Observable<any> {
  //   return this.http.post(`/api/rooms/${roomId}/equipment`, { equipment });
  // }
}
