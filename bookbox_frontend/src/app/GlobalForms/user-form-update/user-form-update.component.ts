import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpdatedUser} from "../../Interface/user";
import {MatLabel} from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-user-form-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './user-form-update.component.html',
  styleUrl: './user-form-update.component.css'
})
export class UserFormUpdateComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  setUser(user: UpdatedUser) {
    this.form.patchValue({
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email
    });
  }

  getAllInputValues(): FormGroup {
    return this.form;
  }
}
