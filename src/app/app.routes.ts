import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomsMapComponent } from './components/rooms-map/rooms-map.component';
import { InfosMusiciansComponent } from './components/infos-musicians/infos-musicians.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'rooms-map', component: RoomsMapComponent },
    { path: 'room-page', component: RoomPageComponent },
    { path: 'infos-musicians', component: InfosMusiciansComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
];
