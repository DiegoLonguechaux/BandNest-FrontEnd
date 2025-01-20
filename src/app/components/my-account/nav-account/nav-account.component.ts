import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { InfosPersoComponent } from '../infos-perso/infos-perso.component';
import { BandPersoComponent } from '../band-perso/band-perso.component';
import { StructurePersoComponent } from '../structure-perso/structure-perso.component';
import { RoomPersoComponent } from '../room-perso/room-perso.component';
import { BookingPersoComponent } from '../booking-perso/booking-perso.component';

@Component({
  selector: 'app-nav-account',
  standalone: true,
  imports: [MatTabsModule, InfosPersoComponent, BandPersoComponent, StructurePersoComponent, RoomPersoComponent, BookingPersoComponent],
  templateUrl: './nav-account.component.html',
  styleUrl: './nav-account.component.css'
})
export class NavAccountComponent {

}
