import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BoxFormComponent} from "../../GlobalForms/box-form/box-form.component";
import {MatButton} from "@angular/material/button";
import {UserFormComponent} from "../../GlobalForms/user-form/user-form.component";
import {UpdateUserService} from "../../service/update-user-service/update-user.service";
import {UpdatedUser, User} from "../../Interface/user";
import {UserService} from "../../service/User-service/user.service";
import {Router} from "@angular/router";
import {UserFormUpdateComponent} from "../../GlobalForms/user-form-update/user-form-update.component";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    MatButton,
    UserFormUpdateComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit, AfterViewInit {


  constructor(private updateUserService:UpdateUserService, private userService: UserService , private router : Router){}

@ViewChild(UserFormUpdateComponent)
  userFormUpdateComponent!:UserFormUpdateComponent;

  userToUpdate!:UpdatedUser;

  updateUser(){
    const form=this.userFormUpdateComponent.getAllInputValues();
    const formValue=form.value;
    const updatedUser : UpdatedUser = {
      userId:formValue.userId!,
      name:formValue.name!,
      surname:formValue.surname!,
      username:formValue.username!,
      email:formValue.email!
    }
    this.userService.updateUser(this.userToUpdate.userId, updatedUser)
      .subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigateByUrl('/users');
        },
        error: err => {
          console.error(err);
          alert('Update failed');
        }
      });
  }

  ngOnInit(){}

  ngAfterViewInit() {
    this.userToUpdate = this.updateUserService.getUserToUpdate();

    let user: UpdatedUser = {
      userId: this.userToUpdate?.userId,
      name: "",
      surname: "",
      username: "",
      email: ""
    }

    if (this.userToUpdate) {
      if (this.userToUpdate.name) {
        user.name = this.userToUpdate.name;
      }
      if (this.userToUpdate.surname) {
        user.surname = this.userToUpdate.surname;
      }
      if (this.userToUpdate.username) {
        user.username = this.userToUpdate.username;
      }
      if (this.userToUpdate.email) {
        user.email = this.userToUpdate.email;
      }

      setTimeout(() => {
        this.userFormUpdateComponent?.getAllInputValues().patchValue({
          name: user.name,
          surname: user.surname,
          username: user.username,
          email: user.email
        });
      });


    }

  }}
