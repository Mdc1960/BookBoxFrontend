import { OnInit, AfterViewInit, ViewChild, Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ReservationFormComponent } from '../../GlobalForms/reservation-form/reservation-form.component';
import { UpdateReservationService } from '../../service/update-reservation-service/update-reservation.service';
import { Reservation, CreatedReservation, ReservationIdAndValue } from '../../Interface/reservation';
import { ReservationService } from '../../service/reservation-service/reservation.service';
@Component({
  selector: 'app-update-reservation',
  standalone: true,
  imports: [
    ReservationFormComponent,
    MatButtonModule
  ],
  templateUrl: './update-reservation.component.html',
  styleUrl: './update-reservation.component.css'
})
export class UpdateReservationComponent implements OnInit, AfterViewInit{

  reservationToUpdate!: Reservation;


  @ViewChild(ReservationFormComponent)
  reservationFormComponent!:ReservationFormComponent;


  constructor(
    private updateReservationService: UpdateReservationService,
    private reservationService : ReservationService,
    private router : Router
  ){}


  updateReservation(){

    const boxId = this.reservationFormComponent.getAllInputValues().get("place")?.value;
    const userId = this.reservationFormComponent.getAllInputValues().get("user")?.value;
    const reservedQuantity = this.reservationFormComponent.getAllInputValues().get("reservedQuantity")?.value;

    if (boxId !== null &&
      userId !== null &&
      reservedQuantity !== null){
        const createReservation: CreatedReservation = {
          reservationId:{
            boxId:boxId,
            userId:userId
          },
          reservationNb: reservedQuantity
        }

        const reservationIdAndValue: ReservationIdAndValue = {
          reservationId:this.reservationToUpdate.reservationId,
          reservationDTO:createReservation
        }

        this.reservationService.updateReservation(reservationIdAndValue).subscribe({
          next: (reservation) =>{
            alert("A reservation was updated !");
            this.router.navigateByUrl('/load-reservation');
          },
          error: (err) =>{
            alert("Error while updating a reservation. Make sure you are provided all the required information."+"Or you may not be allowed to perform this action");
            this.router.navigateByUrl('/load-reservation');
          }
        });

    }else{
      alert("All the field are required !");
    }

    this.reservationFormComponent.resetForm();

  }

  ngOnInit(){
    this.reservationToUpdate = this.updateReservationService.getReservationToUpdate();
  }

  ngAfterViewInit(){
    if (this.reservationToUpdate){
      setTimeout(()=>{
        this.reservationFormComponent?.getAllInputValues().patchValue({
          place: this.reservationToUpdate.box.boxId,
          user: this.reservationToUpdate.user.userId,
          reservedQuantity: this.reservationToUpdate.reservationNb
        });
      });
    }
  }

}
