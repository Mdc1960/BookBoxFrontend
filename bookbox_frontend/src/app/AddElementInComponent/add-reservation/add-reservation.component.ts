import { AfterViewInit, ViewChild, OnInit, Component } from '@angular/core';
import { ReservationFormComponent } from '../../GlobalForms/reservation-form/reservation-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from "@angular/router";
import {ReservationService} from '../../service/reservation-service/reservation.service';
import { CreatedReservation } from '../../Interface/reservation';
import {Router} from "@angular/router";
import { AuthenticationService } from '../../service/AuthenticationService/authentication.service';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    ReservationFormComponent
  ],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnInit, AfterViewInit{

  @ViewChild(ReservationFormComponent)
  reservationFormComponent!:ReservationFormComponent;

  currentUserId!: number;

  constructor(
    private reservationService: ReservationService,
    private router : Router,
    private authService: AuthenticationService
  ){}

  async createReservation(){
    
    const currenId = this.authService.getUserId();

    if(currenId){
      this.currentUserId = parseInt(currenId);
    }
    

    

    const boxId = this.reservationFormComponent.getAllInputValues().get("place")?.value;
    const userId = this.reservationFormComponent.getAllInputValues().get("user")?.value;
    const reservedQuantity = this.reservationFormComponent.getAllInputValues().get("reservedQuantity")?.value;

    if (boxId !== null &&
      userId !== null &&
      reservedQuantity !== null){

        if((this.currentUserId === userId) || this.authService.isAdmin()){

          const createReservation: CreatedReservation = {
            reservationId:{
              boxId:boxId,
              userId:userId
            },
            reservationNb: reservedQuantity
          }
          try{
            const createdReservation = await this.reservationService.createReservation(createReservation);
            if (createdReservation) {
            
              alert("A new reservation was created !");
              this.router.navigateByUrl('/load-reservation')

            }
          }catch(err){
            alert("Error while creating a box. Make sure you are provided all the required information.");
          }
          
        }else{
          alert('You cannot reserve for another user');
        }

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
