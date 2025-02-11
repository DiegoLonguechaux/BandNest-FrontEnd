import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomsMapComponent } from './components/rooms-map/rooms-map.component';
import { InfosMusiciansComponent } from './components/infos-musicians/infos-musicians.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { RoomFormComponent } from './components/my-account/room-form/room-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'plan-salles', component: RoomsMapComponent },
    { path: 'salle-de-repetition/:id', component: RoomPageComponent },
    { path: 'room-form/:id', component: RoomFormComponent, canActivate: [authGuard] },
    { path: 'room-form', component: RoomFormComponent, canActivate: [authGuard] },
    { path: 'infos-musicians', component: InfosMusiciansComponent },
    { path: 'my-account', component: MyAccountComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
