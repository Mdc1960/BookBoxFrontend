import { AfterViewInit, OnInit, ViewChild, Component } from '@angular/core';
import { InscriptionFormComponent } from '../../Component/inscription-form/inscription-form.component';
import { MatButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from '@angular/router';
import { UserFormComponent } from "../../GlobalForms/user-form/user-form.component";
import { UserService } from "../../service/User-service/user.service";
import { CreatedUser } from "../../Interface/user";
import {Router} from '@angular/router'
import { AuthenticationService } from '../../service/AuthenticationService/authentication.service';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatCardModule,
    RouterLink,
    UserFormComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, AfterViewInit {

  @ViewChild(UserFormComponent)
  userFormComponent!: UserFormComponent;

  

  constructor(private userService: UserService,
              private router : Router, private authService: AuthenticationService) {}

  createUser() {
    const name = this.userFormComponent.getAllInputValues().get("name")?.value;
    const surname = this.userFormComponent.getAllInputValues().get("surname")?.value;
    const username = this.userFormComponent.getAllInputValues().get("username")?.value;
    const email = this.userFormComponent.getAllInputValues().get("email")?.value;
    const password = this.userFormComponent.getAllInputValues().get("password")?.value;

    if (name && surname && username && email && password) {
      const newUser: CreatedUser = { name, surname, username, email, password };

      //TODO : check if the user is an administrtor
      if (this.authService.isAdmin()){
        
        this.userService.createUser(newUser).subscribe({
        next: () => {
          alert("A new user was created!");
          this.userFormComponent.resetForm();
          this.router.navigateByUrl('load-user')
        },
        error: (err: any) => {
          console.error(err);
          alert("Error while creating a user. Please check the provided information.");
        }
      });
      }else{
        alert('Only an administrator can perform this action (Add a new user)');
        this.userFormComponent.resetForm();
      }
      
    } else {
      alert("All fields are required!");
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
