import { AfterViewInit, ViewChild, OnInit, Component } from '@angular/core';
import { ReservationFormComponent } from '../../GlobalForms/reservation-form/reservation-form.component';
import {MatButtonModule} from '@angular/material/button';
import {ReservationService} from '../../service/reservation-service/reservation.service';
import { CreatedReservation } from '../../Interface/reservation';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [
    MatButtonModule,
    ReservationFormComponent
  ],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnInit, AfterViewInit{

  @ViewChild(ReservationFormComponent)
  reservationFormComponent!:ReservationFormComponent;

  constructor(
    private reservationService: ReservationService,
    private router : Router
  ){}

  createReservation(){

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
        this.reservationService.createReservation(createReservation).subscribe({
          next: (boxes) =>{
            alert("A new reservation was created !");
            this.router.navigateByUrl('/load-reservation')

          },
          error: (err) =>{
            alert("Error while creating a box. Make sure you are provided all the required information.");
          }
        });

    }else{
      alert("All the field are required !");
    }

    this.reservationFormComponent.resetForm();

  }

  ngOnInit(): void{

  }

  ngAfterViewInit(): void{

  }

}
