import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    private baseUrl = 'http://localhost:3000/counters';

    constructor(private http: HttpClient) { }

    getCounters(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}`);
    }

    getCounterById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    createCounter(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}`, data);
    }

    deleteCounter(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
}
