import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Store, select } from '@ngrx/store';
import * as CustomerActions from '../../store/actions/customer.action';
import { selectUncalledCustomers, selectCalledCustomer } from '../../store/selectors/customer.selector';
import { CustomerResponse } from 'src/app/models/responses/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers: CustomerResponse[];
  calledCustomerObserver: Observable<CustomerResponse>;
  calledCustomer: CustomerResponse;

  private socket: WebSocket;
  private readonly SERVER_URL = 'ws://127.0.0.1:3000';

  constructor(private store: Store) { }

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
    this.store.dispatch(CustomerActions.getUncalledCustomer());
    this.store.pipe(select(selectUncalledCustomers)).subscribe((uncalledCustomers) => {
      this.customers = uncalledCustomers;
    })
  }

  loadCalledCustomer(): void {
    this.store.dispatch(CustomerActions.getCalledCustomer());
    this.calledCustomerObserver = this.store.pipe(select(selectCalledCustomer));
    this.calledCustomerObserver.subscribe(customer => {
      if (customer.callId > 0) {
        this.calledCustomer = customer
      }
    });
  }

  padNumberWithZeros(number: number, length: number): string {
    return number.toString().padStart(length, '0');
  }
}
