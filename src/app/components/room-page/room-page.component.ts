import { Component, computed, inject, signal } from '@angular/core';
import { RoomService } from '../../services/roomService/room.service';
import { RoomModel } from '../../models/room.model';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from '../shared/calendar/calendar.component';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);

  result = signal<RoomModel | null>(null);
  room = computed(()=>this.result() ?? null);
  isLoading = computed(()=>this.result() == null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.roomService.getRoomById(id).subscribe((response) => {
        const roomData = response.data;
        this.result.set(roomData);
      });
    }
  }
}
