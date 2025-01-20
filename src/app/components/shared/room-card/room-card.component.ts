import { Component, computed, inject, signal } from '@angular/core';
import { RoomService } from '../../../services/roomService/room.service';
import { RoomModel } from '../../../models/room.model';
import { Pagination } from '../../../models/pagination.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  private readonly roomService = inject(RoomService);

  result = signal<Pagination<RoomModel[]> | null>(null);
  rooms = computed(()=>this.result()?.data ?? []);
  currentPage = computed(()=>this.result()?.meta.currentPage);
  isLoading = computed(()=>this.result() == null);

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(result => this.result.set(result));
  }
}
