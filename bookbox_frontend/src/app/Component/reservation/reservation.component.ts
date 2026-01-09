import { AfterViewInit, ViewChild, OnInit, ChangeDetectionStrategy, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule ,NgForOf, NgIf } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UpdateReservationService } from '../../service/update-reservation-service/update-reservation.service';
import { ReservationService } from '../../service/reservation-service/reservation.service';
import { Reservation } from '../../Interface/reservation';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatSort,
    MatInput,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit, OnInit{

  listReservation!: Reservation[];

  dataSource:any;
  display:string[] = ["place","user", "quantity","actions"];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private updateReservationService: UpdateReservationService
  ){}

  getAllReservation(){
    this.reservationService.getAllReservation().subscribe({
      next : rest => {
        this.listReservation = rest;

        this.dataSource.data = this.listReservation;
      },
      error : err => {
        console.log(err);
      }
    });
  }

  filterReservation(event:Event){
    const filtered = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtered.trim().toLowerCase();
  }

  handleAddReservation(){
    const conf = confirm("Do you want to add a new reservation ?");

    if(conf){
      this.router.navigateByUrl("/add-reservation");
    }
  }

  handleUpdateReservation(reservation:Reservation){
    const conf = confirm("Do you want to update this reservation ?");

    if(conf){
      this.updateReservationService.redirectToUpdatePageByUrl("/update-reservation",reservation);
    }
  }

  handleDeleteReservation(reservation:Reservation){
    const conf = confirm("Do you want to delete this reservation ?");

    if(conf){

      this.reservationService.deleteReservation(reservation?.reservationId).subscribe({
        next: () => {
          this.getAllReservation(),
          alert("Reservation is deleted.")
        },
        error: err => alert('Error : ' + err.message)
      })


    }
  }

  ngOnInit(){
    this.dataSource = new MatTableDataSource<Reservation>([]);
    this.listReservation = [];
    this.getAllReservation();

    this.dataSource.filterPredicate = (data : Reservation, filter: string)=>{
      const filtered = filter.trim().toLowerCase();

      return (
        data.box.name.toLowerCase().includes(filtered) ||
        data.user.email.toLowerCase().includes(filtered) ||
        `${data.reservationNb}`.toLowerCase().includes(filtered)
      );
    };

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
