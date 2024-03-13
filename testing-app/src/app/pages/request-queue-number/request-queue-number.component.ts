import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerResponse } from '../../models/responses/customer';

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {
  id: string;
  customer: CustomerResponse;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.getCustomerById(this.id);
  }

  getCustomerById(id: string) {
    this.customerService.getCustomerById(id).subscribe((data: CustomerResponse) => {
      this.customer = data;
    });
  }

  changeDateFormat(date: string, timeFormat: string = "MM/dd/yyyy hh:mm a"): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, timeFormat);
  }

  padNumberWithZeros(number, length) {
    return number.toString().padStart(length, '0');
  }

  printPage(){
    window.print();
  }

}
