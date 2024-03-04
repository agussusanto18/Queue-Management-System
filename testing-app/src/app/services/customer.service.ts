import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:3000/customers';

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}`);
    }

    getCustomerById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    createCustomer(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, data);
    }

    deleteCustomer(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    callCustomer(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/call/${id}`);
    }

    getUncalledCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/uncalled`);
    }

    getCalledCustomer(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/called`);
    }
}
