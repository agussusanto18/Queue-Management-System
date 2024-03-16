import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignInResponse, SignInRequest } from '../../models/responses/signin';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.action';
import { selectIsLoggedIn, selectAuthError } from '../../store/selectors/auth.selector';
import { Observable } from 'rxjs';
import { ErrorResponse } from 'src/app/models/responses/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginValid: Observable<boolean>;
  credentials: SignInRequest = { email: '', password: '' };
  error: Observable<ErrorResponse>;

  constructor(private router: Router, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginValid = this.store.pipe(select(selectIsLoggedIn));
    this.error = this.store.pipe(select(selectAuthError));
  }

  login(): void {
    this.store.dispatch(AuthActions.login(this.credentials));
  }
}
