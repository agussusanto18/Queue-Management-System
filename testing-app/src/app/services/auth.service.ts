import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SignInResponse, SignInRequest } from '../models/responses/signin';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/auth';
    private tokenKey = 'jwt_token';

    constructor(private http: HttpClient) { }

    signin(credentials: SignInRequest): Observable<any> {
        const postSignin = this.http.post<any>(`${this.baseUrl}/signin`, credentials);
        return postSignin;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    logout(): Observable<void> {
        localStorage.removeItem('jwt_token');

        return of(null).pipe(
            tap(() => console.log('User logged out successfully'))
        );
    }
}
