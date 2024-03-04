import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.create();
    }
  }

  create(): void {
    this.customerService.createCustomer(this.customerForm.value).subscribe(() => {
      this.router.navigate(['/visitor-list']);
    }, err => {
      console.log(err);
      alert('An error occured');
    });
  }

}
