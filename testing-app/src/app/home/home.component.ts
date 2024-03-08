import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers: any[];
  calledCustomer: any;
  private socket: WebSocket;
  private readonly SERVER_URL = 'ws://127.0.0.1:3000';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.socket = new WebSocket(this.SERVER_URL);

    this.loadCustomers();
    this.loadCalledCustomer();

    this.socket.onmessage = (event) => {
      this.loadCustomers();
      this.loadCalledCustomer();
    }
  }

  loadCustomers(): void {
    this.customerService.getUncalledCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  loadCalledCustomer(): void {
    this.customerService.getCalledCustomer().subscribe(data => {
      if (data.callId > 0){
        this.calledCustomer = data
      }
    });
  }

  padNumberWithZeros(number: number, length: number): string {
    return number.toString().padStart(length, '0');
  }
}
