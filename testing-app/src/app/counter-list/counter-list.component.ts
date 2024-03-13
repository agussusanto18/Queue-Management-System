import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CounterService } from '../services/counter.service';
import { Router } from '@angular/router';
import { CounterResponse } from '../models/responses/counter';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})
export class CounterListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'available', '_id'];
  dataSource = new MatTableDataSource<CounterResponse>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private counterService: CounterService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.counterService.getCounters().subscribe((response: CounterResponse[]) => {
      this.dataSource.data = response;
    });
  }

  delete(id: string): void {
    if (window.confirm('Do you want to proceed?')) {
      this.counterService.deleteCounter(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  changePage(path: string): void {
    this.router.navigate(['/', path]);
  }
}
