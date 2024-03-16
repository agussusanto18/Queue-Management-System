import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CounterService } from '../../services/counter.service';
import { Router } from '@angular/router';
import { CounterResponse } from '../../models/responses/counter';
import { Store, select } from '@ngrx/store';
import * as CounterActions from '../../store/actions/counter.action';
import { Observable } from 'rxjs';
import { selectCounters } from '../../store/selectors/counter.selector';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.css']
})
export class CounterListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'available', '_id'];
  dataSource = new MatTableDataSource<CounterResponse>();
  counters: Observable<CounterResponse[]>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private store: Store, private counterService: CounterService) { }

  ngOnInit(): void {
    this.store.dispatch(CounterActions.counter());
    this.counters = this.store.pipe(select(selectCounters));
    this.counters.subscribe((counterList) => {
      this.dataSource.data = counterList;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: string): void {
    if (window.confirm('Do you want to proceed?')) {
      this.store.dispatch(CounterActions.deleteCounter({ id }));
    }
  }

  changePage(path: string): void {
    this.router.navigate(['/', path]);
  }
}
