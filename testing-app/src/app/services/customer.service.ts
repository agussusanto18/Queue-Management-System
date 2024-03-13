import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerResponse, CustomerRequest } from '../models/responses/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:3000/customers';

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<CustomerResponse[]> {
        return this.http.get<CustomerResponse[]>(`${this.baseUrl}`);
    }

    getCustomerById(id: string): Observable<CustomerResponse> {
        return this.http.get<CustomerResponse>(`${this.baseUrl}/${id}`);
    }

    createCustomer(data: CustomerRequest): Observable<CustomerResponse> {
        return this.http.post<CustomerResponse>(`${this.baseUrl}`, data);
    }

    deleteCustomer(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    callCustomer(id: string): Observable<CustomerResponse> {
        return this.http.get<CustomerResponse>(`${this.baseUrl}/call/${id}`);
    }

    getUncalledCustomers(): Observable<CustomerResponse[]> {
        return this.http.get<CustomerResponse[]>(`${this.baseUrl}/uncalled`);
    }

    getCalledCustomer(): Observable<CustomerResponse> {
        return this.http.get<CustomerResponse>(`${this.baseUrl}/called`);
    }
}
