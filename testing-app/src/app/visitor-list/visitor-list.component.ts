import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {

  displayedColumns: string[] = [
    "counter",
    "name",
    "phoneNumber",
    "queueNumber",
    "address",
    "dateOfBirth",
    "gender",
    "insuranceInformation",
    "createdAt",
    "_id"
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.customerService.getCustomers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: string) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.customerService.deleteCustomer(id).subscribe((res) => {
        this.loadData();
      })
    }
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }

  padNumberWithZeros(number, length) {
    return number.toString().padStart(length, '0');
  }

  changeDateFormat(date: string, timeFormat: string = "MM/dd/yyyy hh:mm a"): String {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, timeFormat);
  }

  callCustomer(id: string){
    if (window.confirm('Do you want to call this Customer?')) {
      this.customerService.callCustomer(id).subscribe((res) => {
        this.loadData();
      })
    }
  }

}

export interface PeriodicElement {
  _id: "string",
  name: "string",
  phoneNumber: "string",
  queueNumber: "number",
  address: "string",
  dateOfBirth: "Date",
  gender: "string",
  emergencyContact: "Object",
  insuranceInformation: "Object",
  medicalHistory: "string",
  occupation: "string",
  maritalStatus: "string",
  createdAt: "string"
};


