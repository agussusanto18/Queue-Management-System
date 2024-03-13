// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SignInResponse, SignInRequest } from '../models/responses/signin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginValid = true;
  credentials: SignInRequest = { email: '', password: '' };

  constructor(private router: Router, private authService: AuthService) { }

  login(): void {
    this.authService.signin(this.credentials)
      .subscribe(
        (response: SignInResponse) => {
          if (response) {
            if (response.token) {
              this.loginValid = true;
              localStorage.setItem('jwt_token', response.token);
              this.router.navigate(['/visitor-list']);
            }
          }
        },
        (error) => {          
          this.loginValid = false;
        }
      );
  }
}
