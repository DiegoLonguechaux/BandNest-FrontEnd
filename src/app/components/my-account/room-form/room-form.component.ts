import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoomService } from '../../../services/roomService/room.service';
import { RoomModel } from '../../../models/room.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModel } from '../../../models/material.model';
import { UserService } from '../../../services/userService/user.service';
import { MaterialService } from '../../../services/materialService/material.service';
import { OperatingHoursService } from '../../../services/operatingHoursService/operating-hours.service';
import { OperatingHoursModel } from '../../../models/operatingHours.model';

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
  private userService = inject(UserService);
  private materialService = inject(MaterialService);
  private operatingHoursService = inject(OperatingHoursService)

  constructor(private router: Router){}

  roomId: number | null = null;
  isEditing = signal(false);
  newMaterial: string = '';
  editingMaterialIndex: number | null = null;
  private readonly weekDays: OperatingHoursModel['day'][] = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ];

  roomDatas: RoomModel = {
    id: 0,
    name: '',
    address: '',
    size: 0,
    price_per_hour: 0,
    // equipment: [],
    materials: [],
    structure_id: undefined,
    operating_hours: this.weekDays.map(day => ({
      day,
      start: null,
      end: null,
      closed: false,
      room_id: undefined
    }))
  }
 
  ngOnInit(): void {
    this.userService.getUser().subscribe((userResponse) => {
      if (userResponse?.data?.structures?.length) {
          const structureId = userResponse.data.structures[0].id; // Récupère la première structure
          console.log("Structure ID récupéré :", structureId);
          this.roomDatas.structure_id = structureId; // Assigne la valeur à roomDatas
      } else {
          console.warn("⚠️ L'utilisateur n'a aucune structure associée !");
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.roomId = +id;
        this.isEditing.set(true);

        this.roomService.getRoomById(this.roomId).subscribe(response => {
          this.roomDatas = { ...response.data };
          // if (response.data.materials) {
          //   this.roomDatas.equipment = response.data.materials; // Assigne les équipements récupérés
          // }
          console.log(this.roomDatas)
          if (response.data.materials) {
            console.log("Matériels récupérés :", response.data.materials); // Debug
            this.roomDatas.materials = response.data.materials; // ✅ Correction ici
          } else {
              this.roomDatas.materials = [];
          }
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

  addMaterial() {
    if (this.newMaterial.trim()) {
      const newMat: MaterialModel = { name: this.newMaterial.trim() };

      if (this.editingMaterialIndex !== null) {
        // Modification d'un matériel existant
        this.roomDatas.materials[this.editingMaterialIndex] = newMat;
        this.editingMaterialIndex = null;
      } else {
        // Ajout d'un nouveau matériel
        this.roomDatas.materials = [...this.roomDatas.materials, newMat]; // Utilisation du spread operator pour forcer la détection du changement
      }

      this.newMaterial = ''; // Réinitialise l'input
    }
  }
  
  editMaterial(index: number) {
    this.newMaterial = this.roomDatas.materials[index].name;
    this.editingMaterialIndex = index; // Stocke l'index du matériel en cours de modification
  }

  removeMaterial(index: number) {
    this.roomDatas.materials = this.roomDatas.materials.filter((_, i) => i !== index); // Mise à jour propre
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
        this.roomService.createRoom(this.roomDatas).subscribe((createdRoom) => {
          const roomId = (createdRoom as any)?.data?.id ?? createdRoom.id;
          console.log("Salle créée :", createdRoom);
          // Associer room_id et envoyer les équipements
          if (this.roomDatas.materials && this.roomDatas.materials.length > 0) {
            this.roomDatas.materials.forEach(mat => {
              mat.room_id = roomId // Ajoute l'ID de la salle
              this.materialService.addEquipment(mat) // Envoi unitaire
                  .subscribe(() => console.log("Matériel ajouté :", mat),
                      error => console.error("Erreur ajout matériel :", error));
            });
          }

          // Associer room_id et envoyer les horaires
          if (this.roomDatas.operating_hours.length > 0) {
            this.roomDatas.operating_hours.forEach(hour => {
              hour.room_id = roomId; // Ajout du room_id
              this.operatingHoursService.addOperatingHours(hour)
                  .subscribe(() => console.log("Horaire ajouté :", hour),
                      error => console.error("Erreur ajout horaire :", error));
            });
          }
          this.router.navigate(['/my-account']);
        });
      }
    }
  }
}
