import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {

    constructor(private http: HttpClient) { }

    getCounters(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/counters');
    }

    getCounterById(id: String): Observable<any[]> {
        return this.http.get<any>(`http://localhost:3000/counters/${id}`);
    }

    createCounter(data: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/counters', data);
    }

    deleteCounter(id: String): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/counters/${id}`);
    }

}
