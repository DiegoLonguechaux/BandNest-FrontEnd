import { Component, computed, inject, Input, signal } from '@angular/core';
import { RoomCardComponent } from '../shared/room-card/room-card.component';
import { RoomModel } from '../../models/room.model';
import { RoomService } from '../../services/roomService/room.service';
import { Pagination } from '../../models/pagination.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-rooms-map',
  standalone: true,
  imports: [RoomCardComponent, MapComponent],
  templateUrl: './rooms-map.component.html',
  styleUrl: './rooms-map.component.css'
})
export class RoomsMapComponent {
  private readonly roomService = inject(RoomService);

  result = signal<Pagination<RoomModel[]> | null>(null);
  rooms = computed(() => this.result()?.data ?? []);
  currentPage = computed(() => this.result()?.meta.currentPage);
  isLoading = computed(() => this.result() == null);

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(result => this.result.set(result));
  }
}
