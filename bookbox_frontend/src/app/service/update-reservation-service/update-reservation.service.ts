import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Reservation} from '../../Interface/reservation';

@Injectable({
  providedIn: 'root'
})
export class UpdateReservationService {

  reservationToUpdate!: Reservation;

  constructor(
    private router: Router
  ) { }


  redirectToUpdatePageByUrl(url:string, reservation:Reservation){
    this.reservationToUpdate = reservation;
    this.router.navigateByUrl(url);
  }

  getReservationToUpdate(): Reservation{
    return this.reservationToUpdate;
  }

}
