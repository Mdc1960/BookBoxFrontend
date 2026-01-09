import { AfterViewInit, OnInit, ViewChild, Component } from '@angular/core';
import { InscriptionFormComponent } from '../../Component/inscription-form/inscription-form.component';
import { MatButton } from "@angular/material/button";
import { UserFormComponent } from "../../GlobalForms/user-form/user-form.component";
import { UserService } from "../../service/User-service/user.service";
import { CreatedUser } from "../../Interface/user";
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatButton,
    UserFormComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, AfterViewInit {

  @ViewChild(UserFormComponent)
  userFormComponent!: UserFormComponent;

  constructor(private userService: UserService,
              private router : Router) {}

  createUser() {
    const name = this.userFormComponent.getAllInputValues().get("name")?.value;
    const surname = this.userFormComponent.getAllInputValues().get("surname")?.value;
    const username = this.userFormComponent.getAllInputValues().get("username")?.value;
    const email = this.userFormComponent.getAllInputValues().get("email")?.value;
    const password = this.userFormComponent.getAllInputValues().get("password")?.value;

    if (name && surname && username && email && password) {
      const newUser: CreatedUser = { name, surname, username, email, password };

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
    } else {
      alert("All fields are required!");
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
