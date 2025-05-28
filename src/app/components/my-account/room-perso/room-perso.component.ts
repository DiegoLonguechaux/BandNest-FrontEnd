import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomModel } from '../../../models/room.model';
import { StructureService } from '../../../services/structureService/structure.service';
import { UserService } from '../../../services/userService/user.service';
import { RoomCardComponent } from '../../shared/room-card/room-card.component';

@Component({
  selector: 'app-room-perso',
  standalone: true,
  imports: [CommonModule, RoomCardComponent, RouterModule],
  templateUrl: './room-perso.component.html',
  styleUrl: './room-perso.component.css'
})
export class RoomPersoComponent {
  private userService = inject(UserService);
  private structureService = inject(StructureService);

  rooms = signal<RoomModel[]>([]);
  isLoading = computed(() => this.rooms().length === 0);

  ngOnInit(): void {
    this.userService.getUser().subscribe((userResponse) => {
      if (userResponse?.data?.structures?.length!) {
        const structureId = userResponse.data.structures[0].id!;

        // Récupération des salles de la structure
        this.structureService.getRoomsStructure(structureId).subscribe((roomsResponse) => {
          this.rooms.set(roomsResponse);
        });
      }
    });
  }
}
