import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog, MatDialogModule
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from '../../models/room.model';
import { RoomService } from '../../services/roomService/room.service';
import { BookingPopupComponent } from '../shared/booking-popup/booking-popup.component';
import { CalendarComponent } from '../shared/calendar/calendar.component';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [CalendarComponent, CommonModule, FormsModule, MatDialogModule],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent {
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);
  // private dialog = inject(MatDialog);
  
  readonly dialog = inject(MatDialog);

  result = signal<RoomModel | null>(null);
  room = computed(()=>this.result() ?? null);
  isLoading = computed(()=>this.result() == null);

  showModal: boolean = false;
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.roomService.getRoomById(id).subscribe((response) => {
        const roomData = response.data;
        this.result.set(roomData);
      });
    }
  }

  openBookingPopup(): void {
    const dialogRef = this.dialog.open(BookingPopupComponent, {
      data: { room: this.result() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User booked under name:', result);
      }
    });
  }
}
