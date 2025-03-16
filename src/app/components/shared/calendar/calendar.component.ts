import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() events: any[] = [];
  @Output() dateSelected = new EventEmitter<string>();

  showModal: boolean = false;
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
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
    selectable: true,
    dateClick: (info) => {
      this.dateSelected.emit(info.dateStr); 
    }
    // events: [
    //   {
        
    //   }
    // ],
    // eventClick: function() {
      
    // }
  };
}
