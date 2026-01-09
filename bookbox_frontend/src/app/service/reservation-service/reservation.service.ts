import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, CreatedReservation, ReservationIdAndValue } from '../../Interface/reservation';
import { ReservationId } from '../../Interface/reservation-id';
import {Box} from "../../Interface/box";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  box  : any ;
  listReservation : Reservation[] = [];
  remaining : number = 0;
  totalQuantity:number =0
  constructor(private http : HttpClient) { }

  getAllReservation(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>("/api/reservation");
  }
  checkValidityOfAdding(createReservation:CreatedReservation){
    const id =createReservation.reservationId.boxId
    this.http.get<Box>(`api/box/${id}`).subscribe({
      next : rest =>{
        this.box=rest;
      },  error : err => {
        console.log(err);
      }
    })
    this.http.get<Reservation[]>(`api/reservation`).subscribe({
      next : rest =>{
        this.listReservation=rest;
      },  error : err => {
        console.log(err);
      }
    })

    this.listReservation.forEach(res=>{
      if(res.box.boxId === id){
        this.totalQuantity+=res.reservationNb
      }
    })

    let quantity_box = this.box?.quantity
    let reservation_quantity = createReservation.reservationNb
    this.remaining = quantity_box - this.totalQuantity ;
    return quantity_box - (this.totalQuantity + reservation_quantity) >= 0;
  }
  createReservation(createReservation:CreatedReservation): Observable<Reservation>{
    if (this.checkValidityOfAdding(createReservation)){
      console.log("Reservation")
      return this.http.post<Reservation>("/api/reservation", createReservation);
    }else {
      console.log("Not Reservation")
      alert("You cannot create this reservation. The remaining box quantity is : " + this.remaining);
      return new Observable<Reservation>();
    }

  }

  updateReservation(reservationIdAndValue:ReservationIdAndValue):Observable<Reservation>{
    return this.http.put<Reservation>("/api/reservation/id", reservationIdAndValue);
  }

  deleteReservation(id:ReservationId){
    return this.http.delete<void>(
      "/api/reservation/id",
      {
        body:id
      }

    );
  }

}
