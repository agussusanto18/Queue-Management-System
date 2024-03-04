import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/customers');
    }

    getCustomerById(id: String): Observable<any[]> {
        return this.http.get<any>(`http://localhost:3000/customers/${id}`);
    }

    createCustomer(data: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/customers', data);
    }

    deleteCustomer(id: String): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/customers/${id}`);
    }

    callCustomer(id: String): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/customers/call/${id}`);
    }

    getUncalledCustomers(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/customers/uncalled');
    }

    getCalledCustomer(): Observable<any[]> {
        return this.http.get<any>('http://localhost:3000/customers/called');
    }

}
