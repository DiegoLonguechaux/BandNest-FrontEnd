import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookingModel } from '../../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http = inject(HttpClient);

  constructor() { }

  createBooking(booking: BookingModel): Observable<any> {
    // return this.http.post(this.apiUrl, booking);
    return this.http.post<BookingModel>(`${environment.apiUrl}/bookings`, booking);
  }
}