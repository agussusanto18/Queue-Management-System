import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn, selectAuthToken } from './store/selectors/auth.selector';
import * as AuthActions from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testing-app';
  currentDate: string;
  isLoggedIn: Observable<boolean>;
  token: Observable<string>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.store.pipe(select(selectIsLoggedIn));
    this.token = this.store.pipe(select(selectAuthToken));

    this.updateCurrentDate();

    setInterval(() => {
      this.updateCurrentDate();
    }, 1000);
  }

  updateCurrentDate() {
    const datePipe = new DatePipe('en-US');
    this.currentDate = datePipe.transform(new Date(), 'EEE, dd MMM yyyy hh:mm a');
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
