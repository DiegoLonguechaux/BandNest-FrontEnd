import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StructureModel } from '../../models/structure.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoomModel } from '../../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private readonly http = inject(HttpClient);

  constructor() { }

  getStructure(structure: number): Observable<StructureModel> {
    return this.http.get<{ data: StructureModel }>(`${environment.apiUrl}/structures/${structure}`).pipe(map(response => response.data));
  }

  createStructure(data: StructureModel): Observable<StructureModel> {
    return this.http.post<{ data: StructureModel }>(`${environment.apiUrl}/structures`, data).pipe(
      map(response => response.data)
    );
  }

  updateStructure(structure: number, data: Partial<StructureModel>): Observable<StructureModel> {
    return this.http.patch<{ data: StructureModel }>(`${environment.apiUrl}/structures/${structure}`, data).pipe(
      map(response => response.data)
    );
  }

  getRoomsStructure(structureId: number): Observable<RoomModel[]> {
    return this.http.get<{ data: StructureModel }>(`${environment.apiUrl}/structures/${structureId}`)
      .pipe(
        map(response => response.data.rooms ?? [])
      );
  }
}