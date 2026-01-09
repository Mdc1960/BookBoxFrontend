import { Component } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inscription-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.css'
})
export class InscriptionFormComponent {

  passwordMatchValidator: ValidatorFn = (control: AbstractControl
  ): ValidationErrors | null => {
    const form = control as FormGroup;
    const pass = form.get('Password')?.value;
    const confirm = form.get('Password_Confirmation')?.value;
    return pass === confirm ? null : {passwordMismatch: true};

  };
  formGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Surname: new FormControl('', Validators.required),
      LoginName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      Password_Confirmation: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email])
    },
    {validators: this.passwordMatchValidator});

  wrongCredentials = false;

  constructor(private http: HttpClient) {
  }

  register() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const user = {
      name: this.formGroup.value.Name,
      surname: this.formGroup.value.Surname,
      username: this.formGroup.value.LoginName,
      password: this.formGroup.value.Password,
      email: this.formGroup.value.Email
    };

    this.http.post('/api/users', user).subscribe(
      res => {
        console.log("User Created with success !!", res);
        this.wrongCredentials = false;
        this.formGroup.reset();
      },
      error => {
        console.error("an error occurred while signing up", error);
        this.wrongCredentials = true;
      }
    );
  }
}
