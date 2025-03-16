import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  MatDialog, MatDialogModule
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from '../../models/room.model';
import { RoomService } from '../../services/roomService/room.service';
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
  private dialog = inject(MatDialog);

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

  openModal(date: string) {
    this.selectedDate = date;
    this.startTime = '';
    this.endTime = '';
    this.showModal = true;
  }

  // Ferme la popup
  closeModal() {
    this.showModal = false;
  }

  // Confirme la réservation
  confirmReservation() {
    if (this.startTime && this.endTime) {
      console.log(`Réservation confirmée pour le ${this.selectedDate} de ${this.startTime} à ${this.endTime}`);
      this.closeModal();
    } else {
      alert("Veuillez choisir une heure de début et une heure de fin.");
    }
  }
}
