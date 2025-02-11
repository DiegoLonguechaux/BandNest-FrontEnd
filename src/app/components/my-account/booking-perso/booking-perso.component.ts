import { Component } from '@angular/core';
import { CalendarComponent } from '../../shared/calendar/calendar.component';

@Component({
  selector: 'app-booking-perso',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './booking-perso.component.html',
  styleUrl: './booking-perso.component.css'
})
export class BookingPersoComponent {

}