import { OnInit, AfterViewInit, ViewChild, Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ReservationFormComponent } from '../../GlobalForms/reservation-form/reservation-form.component';
import { UpdateReservationService } from '../../service/update-reservation-service/update-reservation.service';
import { Reservation, CreatedReservation, ReservationIdAndValue } from '../../Interface/reservation';
import { ReservationService } from '../../service/reservation-service/reservation.service';
import { AuthenticationService } from '../../service/AuthenticationService/authentication.service';
@Component({
  selector: 'app-update-reservation',
  standalone: true,
  imports: [
    ReservationFormComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './update-reservation.component.html',
  styleUrl: './update-reservation.component.css'
})
export class UpdateReservationComponent implements OnInit, AfterViewInit{

  reservationToUpdate!: Reservation;


  @ViewChild(ReservationFormComponent)
  reservationFormComponent!:ReservationFormComponent;

  currentUserId!: number;


  constructor(
    private updateReservationService: UpdateReservationService,
    private reservationService : ReservationService,
    private router : Router,
    private authService: AuthenticationService
  ){}


  async updateReservation(){

    const boxId = this.reservationFormComponent.getAllInputValues().get("place")?.value;
    const userId = this.reservationFormComponent.getAllInputValues().get("user")?.value;
    const reservedQuantity = this.reservationFormComponent.getAllInputValues().get("reservedQuantity")?.value;

    if (boxId !== null &&
      userId !== null &&
      reservedQuantity !== null){

        const currentId = this.authService.getUserId();

        if (currentId){
          this.currentUserId = parseInt(currentId);
        }

        if ((this.currentUserId === userId) || this.authService.isAdmin()){

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

          try{
            const updatedReservation = await this.reservationService.updateReservation(reservationIdAndValue);
            if(updatedReservation){
              alert("A reservation was updated !");
              this.router.navigateByUrl('/load-reservation');
            }
          }catch(err){
          
            alert("Error while updating a reservation. Make sure you are provided all the required information."+"Or you may not be allowed to perform this action");
            this.router.navigateByUrl('/load-reservation');
            
          };
        }else{
          alert('You cannot update others reservations.');
        }

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
