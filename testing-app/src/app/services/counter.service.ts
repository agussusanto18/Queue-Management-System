import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CounterResponse, CounterRequest } from '../models/responses/counter';

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    private baseUrl = 'http://localhost:3000/counters';

    constructor(private http: HttpClient) { }

    getCounters(): Observable<CounterResponse[]> {
        return this.http.get<CounterResponse[]>(`${this.baseUrl}`);
    }

    getCounterById(id: string): Observable<CounterResponse> {
        return this.http.get<CounterResponse>(`${this.baseUrl}/${id}`);
    }

    createCounter(data: CounterRequest): Observable<CounterResponse> {
        return this.http.post<CounterResponse>(`${this.baseUrl}`, data);
    }

    deleteCounter(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
}
