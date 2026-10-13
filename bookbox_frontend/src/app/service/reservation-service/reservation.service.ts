import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
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

  async createReservation(createReservation:CreatedReservation): Promise<Reservation | null>{

    const boxId = createReservation.reservationId.boxId;

    const [box, reservations] = await Promise.all([
      firstValueFrom(this.http.get<Box>(`/api/box/${boxId}`)),
      firstValueFrom(this.http.get<Reservation[]>('/api/reservation'))
    ]);

    const totalReserved = reservations
      .filter(res => res.box.boxId === boxId)
      .reduce((sum, res) => sum + res.reservationNb, 0);

    const remaining = box.quantity - totalReserved;

    if (createReservation.reservationNb > remaining) {
      alert('You cannot create this reservation. The remaining box quantity is : ' + remaining);
      return null;
    }

    return firstValueFrom(this.http.post<Reservation>('/api/reservation', createReservation));

  }

  async updateReservation(reservationIdAndValue:ReservationIdAndValue):Promise<Reservation | null>{

    const boxId = reservationIdAndValue.reservationId.boxId;

    const [box, reservations] = await Promise.all([
      firstValueFrom(this.http.get<Box>(`/api/box/${boxId}`)),
      firstValueFrom(this.http.get<Reservation[]>('/api/reservation'))
    ]);

    const totalReserved = reservations
      .filter(res => res.box.boxId === boxId)
      .reduce((sum, res) => sum + res.reservationNb, 0);

    const remaining = box.quantity - totalReserved;

    if (reservationIdAndValue.reservationDTO.reservationNb > remaining) {
      alert('You cannot update this reservation. The remaining box quantity is : ' + remaining);
      return null;
    }

    return firstValueFrom(this.http.put<Reservation>("/api/reservation/id", reservationIdAndValue));

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
