import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CounterService } from '../../services/counter.service';
import { Store, select } from '@ngrx/store';
import * as CustomerActions from '../../store/actions/customer.action';
import * as CounterActions from '../../store/actions/counter.action';
import { Observable } from 'rxjs';
import { CounterResponse } from 'src/app/models/responses/counter';
import { selectCounters } from '../../store/selectors/counter.selector';


@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  customerForm: FormGroup;
  counterObserver: Observable<CounterResponse[]>;
  counters: any[];

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDataCounters();
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.createCustomer();
    }
  }

  private initializeForm(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      emergencyContact: this.formBuilder.group({
        name: [''],
        relationship: [''],
        phoneNumber: ['']
      }),
      insuranceInformation: this.formBuilder.group({
        provider: [''],
        policyNumber: ['']
      }),
      medicalHistory: [''],
      occupation: ['', Validators.required],
      maritalStatus: [''],
    });
  }

  private createCustomer(): void {
    this.store.dispatch(CustomerActions.createCustomer(this.customerForm.value));
  }

  loadDataCounters(): void {
    this.store.dispatch(CounterActions.counter());
    this.counterObserver = this.store.pipe(select(selectCounters));
    this.counterObserver.subscribe((counterList) => {
      this.counters = counterList;
    });
  }

  changePage(path) {
    this.router.navigate(['/' + path]);
  }
}
