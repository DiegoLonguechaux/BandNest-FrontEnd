import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatingHoursModel } from '../../models/operatingHours.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatingHoursService {
  private readonly http = inject(HttpClient);

  constructor() { }

  addOperatingHours(operating_hours: OperatingHoursModel[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}/operating-hours`, { operating_hours }); // Envoi direct
  }
}
