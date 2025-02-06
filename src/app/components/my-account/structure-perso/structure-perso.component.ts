import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../../services/userService/user.service';
import { StructureService } from '../../../services/structureService/structure.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StructureModel } from '../../../models/structure.model';

@Component({
  selector: 'app-structure-perso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './structure-perso.component.html',
  styleUrl: './structure-perso.component.css'
})
export class StructurePersoComponent {
  private userService = inject(UserService);
  private structureService = inject(StructureService);

  structure = signal<StructureModel | null>(null);
  structureDatas: StructureModel = {
    name: '',
    description: '',
    address: '',
    city: '',
    zip_code: '',
    country: '',
    // owner_id: '',
  };

  isEditing = signal(false);
  isLoading = computed(() => this.structure() === null);
  structureExists = computed(() => this.structure() !== null);

  ngOnInit(): void {
    this.userService.getUser().subscribe((userResponse) => {
      if (userResponse?.data?.structures?.length) {
        const structureId = userResponse.data.structures[0].id!;
        // if (structureId !== undefined) {
        this.structureService.getStructure(structureId).subscribe((structureResponse) => {
          if (structureResponse) {
            this.structure.set(structureResponse);
            this.structureDatas = { ...structureResponse };
          }
        });
        // }
      }
    });
  }

  enableEditing(): void {
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    if (this.structure()) {
      this.structureDatas = { ...this.structure()! };
    }
    this.isEditing.set(false);
  }

  saveChanges(form: NgForm): void {
    if (form.valid) {
      if (this.structureExists()) {
        const structureId = this.structure()!.id!;
        this.structureService.updateStructure(structureId, this.structureDatas).subscribe((updatedStructure) => {
          this.structure.set(updatedStructure);
          this.isEditing.set(false);
        });
      } else {
        this.structureService.createStructure(this.structureDatas).subscribe((newStructure) => {
          this.structure.set(newStructure);
          this.isEditing.set(false);
        });
      }
    }
  }
}
