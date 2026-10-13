
import { Routes } from '@angular/router';

import { BoxComponent } from './Component/box/box.component';
import { ReservationComponent } from './Component/reservation/reservation.component';
import { UserComponent } from './Component/user/user.component';
import { CoordinatesComponent } from './Component/coordinates/coordinates.component';
import { HomeComponent } from './Component/home/home.component';

import { AddBoxComponent } from './AddElementInComponent/add-box/add-box.component';
import { AddReservationComponent } from './AddElementInComponent/add-reservation/add-reservation.component';
import { AddUserComponent } from './AddElementInComponent/add-user/add-user.component';

import { ConnexionFormComponent } from './Component/connexion-form/connexion-form.component';
import { InscriptionFormComponent } from './Component/inscription-form/inscription-form.component';

import { BoxFormComponent } from './GlobalForms/box-form/box-form.component';
import { ReservationFormComponent } from './GlobalForms/reservation-form/reservation-form.component';

import { UpdateBoxComponent } from './UpdateElementComponent/update-box/update-box.component';
import { UpdateReservationComponent } from './UpdateElementComponent/update-reservation/update-reservation.component';
import { UpdateUserComponent } from './UpdateElementComponent/update-user/update-user.component';

import { MapComponent } from './Component/map/map.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // Pages publiques
  {
    path: 'authentication',
    component: ConnexionFormComponent
  },
  {
    path: 'SignIn',
    component: InscriptionFormComponent
  },

  // Pages privées
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'load-user',
    component: UserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'load-box',
    component: BoxComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-box',
    component: AddBoxComponent,
    canActivate: [authGuard]
  },
  {
    path: 'load-reservation',
    component: ReservationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-reservation',
    component: AddReservationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'map',
    component: CoordinatesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'Map',
    component: MapComponent,
    canActivate: [authGuard]
  },
  {
    path: 'box-form',
    component: BoxFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'reservation-form',
    component: ReservationFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update-box',
    component: UpdateBoxComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update-user',
    component: UpdateUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update-reservation',
    component: UpdateReservationComponent,
    canActivate: [authGuard]
  },

  // Redirections
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication'
  },
  {
    path: '**',
    redirectTo: 'authentication'
  }
];
