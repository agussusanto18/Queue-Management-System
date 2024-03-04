import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testing-app';
  currentDate: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
}
