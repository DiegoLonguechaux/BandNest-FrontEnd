import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() events: any[] = []; // Permet d'injecter des événements dynamiques

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    themeSystem: 'darkly',
    height: 700,
    locale: 'fr',
    firstDay: 1,
    headerToolbar: {
      start: 'today',
      center: 'title',
      end: 'prev,next'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour'
    },
    events: this.events
  };
}
