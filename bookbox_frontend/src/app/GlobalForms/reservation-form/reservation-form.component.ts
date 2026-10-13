import { ChangeDetectionStrategy, OnInit, Component } from '@angular/core';
import { CommonModule ,NgForOf, NgIf } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { BoxService } from '../../service/box-service/box.service';
import { Box } from '../../Interface/box';
import { UserService } from "../../service/User-service/user.service";
import {User} from "../../Interface/user";



@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{

  boxList!: Box[];
  userList!: any[];

  reservations = new FormGroup({
   place: new FormControl<string | null >(null, [Validators.required]),
   user:new FormControl<string | null >(null),
   reservedQuantity:new FormControl<number | null >(null, [Validators.required])

 });

  constructor(
    private boxService:BoxService,
    private userService : UserService
  ){

  }

  getAllInputValues():any{
    return this.reservations;
  }

  resetForm(){
    this.reservations.reset();
  }

  getAllBoxes(){
    this.boxService.getAllBoxes().subscribe({
      next : rest => {
        this.boxList = rest;
      },
      error : err => {
        console.log(err);
      }
    });

  }

  getAllUser() {
    this.userService.getAllUsers().subscribe({
      next: (rest: User[]) => {
        this.userList = rest;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void{
    this.boxList = [];
    this.userList = [];
    this.getAllBoxes();
    this.getAllUser();
  }

}
