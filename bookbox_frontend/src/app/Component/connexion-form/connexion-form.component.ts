import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../service/AuthenticationService/authentication.service';

interface AuthResponse {
  jwt: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-connexion-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, NgIf, RouterLink],
  templateUrl: './connexion-form.component.html',
  styleUrl: './connexion-form.component.css'
})
export class ConnexionFormComponent {
  formGroup = new FormGroup({
    LoginName: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  wrongCredentials = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const credentials = {
      username: this.formGroup.value.LoginName!,
      password: this.formGroup.value.Password!
    };

    this.authService.login(credentials).subscribe({
      next: (res: AuthResponse) => {
        this.wrongCredentials = false;

        this.authService.getUsername();


        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.wrongCredentials = true;
      }
    });
  }
}
