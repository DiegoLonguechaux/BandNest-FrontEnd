import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomService } from '../../../services/roomService/room.service';
import { RoomModel } from '../../../models/room.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  constructor(private router: Router){}

  roomId: number | null = null;
  isEditing = signal(false);

  roomDatas: RoomModel = {
    id: 0,
    name: '',
    address: '',
    size: 0,
    price_per_hour: 0,
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
      }
    });
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
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
