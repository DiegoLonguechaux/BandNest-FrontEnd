import { Component, computed, inject, Input, signal } from '@angular/core';
import { RoomService } from '../../../services/roomService/room.service';
import { RoomModel } from '../../../models/room.model';
import { Pagination } from '../../../models/pagination.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room!: RoomModel;
  @Input() isOwnerView: boolean = false;
  private readonly roomService = inject(RoomService);

  result = signal<Pagination<RoomModel[]> | null>(null);
  rooms = computed(() => this.result()?.data ?? []);
  currentPage = computed(() => this.result()?.meta.currentPage);
  isLoading = computed(() => this.result() == null);

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(result => this.result.set(result));
  }
}
