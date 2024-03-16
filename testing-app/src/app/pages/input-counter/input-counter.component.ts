import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CounterService } from '../../services/counter.service';
import { Store } from '@ngrx/store';
import * as CounterActions from '../../store/actions/counter.action';

@Component({
  selector: 'app-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.css']
})
export class InputCounterComponent implements OnInit {

  counterForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder, private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterForm = this.formBuilder.group({
      name: ['', Validators.required],
      available: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.counterForm.valid) {
      this.create();
    }
  }

  create(): void {
    this.store.dispatch(CounterActions.createCounter(this.counterForm.value));
  }

}
