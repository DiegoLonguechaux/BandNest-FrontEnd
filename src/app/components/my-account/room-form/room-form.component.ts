import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomService } from '../../../services/roomService/room.service';
import { OperatingHours, RoomModel } from '../../../models/room.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  constructor(private router: Router){}

  roomId: number | null = null;
  isEditing = signal(false);
  private readonly weekDays: OperatingHours['day'][] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  roomDatas: RoomModel = {
    id: 0,
    name: '',
    address: '',
    size: 0,
    price_per_hour: 0,
    operating_hours: this.weekDays.map(day => ({
      day,
      start: null, // Par défaut, pas d'horaires
      end: null,
      closed: false  // Par défaut, la salle est fermée
    }))
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.roomId = +id;
        this.isEditing.set(true);

        this.roomService.getRoomById(this.roomId).subscribe(response => {
          this.roomDatas = { ...response.data };
        });

        if (!this.roomDatas.operating_hours || this.roomDatas.operating_hours.length === 0) {
          this.roomDatas.operating_hours = this.weekDays.map(day => ({
            day,
            start: null,
            end: null,
            closed: true
          }));
        }
      }
    });
  }

  toggleClosed(index: number): void {
    const hour = this.roomDatas.operating_hours[index];
    
    if (hour.closed) {
      // S'il est fermé, on met start et end à null
      hour.start = null;
      hour.end = null;
    } else {
      // Sinon, on initialise avec des valeurs par défaut (exemple 09:00 - 18:00)
      hour.start = hour.start ?? '';
      hour.end = hour.end ?? '';
    }
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.roomDatas.operating_hours.forEach(hour => {
        if (hour.closed) {
          hour.start = null;
          hour.end = null;
        }
      });

      if (this.isEditing()) {
        console.log(this.roomId);
        this.roomService.updateRoom(this.roomId!, this.roomDatas).subscribe(() => {
          this.router.navigate(['/my-account']);
        });
      } else {
        this.roomService.createRoom(this.roomDatas).subscribe(() => {
          this.router.navigate(['/my-account']);
        });
      }
    }
  }
}
