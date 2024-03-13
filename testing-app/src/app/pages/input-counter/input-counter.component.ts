import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CounterService } from '../../services/counter.service';


@Component({
  selector: 'app-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.css']
})
export class InputCounterComponent implements OnInit {

  counterForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private counterService: CounterService) { }

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
    this.counterService.createCounter(this.counterForm.value).subscribe(() => {
      this.router.navigate(['/counter-list']);
    }, err => {
      console.log(err);
      alert('An error occured');
    });
  }

}
