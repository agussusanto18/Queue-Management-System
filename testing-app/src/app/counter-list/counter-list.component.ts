import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { CounterService } from '../services/counter.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})
export class CounterListComponent implements OnInit {

  displayedColumns: string[] = [
    "name",
    "available",
    "_id"
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private counterService: CounterService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.counterService.getCounters().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: string) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.counterService.deleteCounter(id).subscribe((res) => {
        this.loadData();
      })
    }
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }
}

export interface PeriodicElement {
  _id: "string",
  name: "string",
  available: "boolean",
  createdAt: "string"
};


