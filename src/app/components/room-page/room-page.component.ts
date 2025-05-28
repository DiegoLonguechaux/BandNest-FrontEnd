import { CommonModule, formatDate } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog, MatDialogModule
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from '../../models/room.model';
import { RoomService } from '../../services/roomService/room.service';
import { StructureService } from '../../services/structureService/structure.service';
import { UserService } from '../../services/userService/user.service';
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
  private structureService = inject(StructureService);
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  // private dialog = inject(MatDialog);
  
  readonly dialog = inject(MatDialog);

  currentUser = signal<any>(null);
  result = signal<RoomModel | null>(null);
  room = computed(()=>this.result() ?? null);
  isLoading = computed(()=>this.result() == null);
  showModal: boolean = false;
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  
  // Variable pour vérifier si l'utilisateur est propriétaire de la room
  isOwner = computed(() => {
    const room = this.room();
    const user = this.currentUser();
    
    if (!room || !user) return false;
    
    // Type assertion pour accéder à la propriété structure
    const roomWithStructure = room as any;
    if (!roomWithStructure.structure) return false;
    
    // Vérifier si l'utilisateur est propriétaire via la structure
    return user.structures?.some((structure: any) => 
      structure.id === roomWithStructure.structure.id
    ) || false;
  });

  formatHour(dateTime: string): string {
    try {
      return formatDate(dateTime, 'HH:mm', 'fr-FR');
    } catch {
      return dateTime;
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUser().subscribe((userResponse) => {
        // Stocker les données de l'utilisateur
        this.currentUser.set(userResponse?.data);
        
        if (userResponse?.data?.structures?.length!) {
          const structureId = userResponse.data.structures[0].id!;

          // Récupération des salles de la structure
          this.structureService.getRoomsStructure(structureId).subscribe((roomsResponse) => {
            // this.result.set(roomsResponse);
          });
        }
      });

      this.roomService.getRoomById(id).subscribe((response) => {
        const roomData = response.data;
        this.result.set(roomData);

        if (roomData) {
          roomData.materials = roomData.materials ?? [];

          roomData.operating_hours = roomData.operating_hours.map(hour => {
            return {
              ...hour,
              start: this.formatHour(hour.start || ''),
              end: this.formatHour(hour.end || '')
            };
          });

          this.result.set(roomData);
        }
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
