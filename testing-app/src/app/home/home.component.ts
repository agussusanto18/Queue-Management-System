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

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getUncalledCustomers();
    this.getCalledCustomer();
  }

  getUncalledCustomers(){
    this.customerService.getUncalledCustomers().subscribe(data => {
      this.customers = data;
      console.log(this.customers);
      
    });
  }

  getCalledCustomer() {
    this.customerService.getCalledCustomer().subscribe(data => {
      this.calledCustomer = data;
    });
  }

  padNumberWithZeros(number, length) {
    return number.toString().padStart(length, '0');
  }

}
