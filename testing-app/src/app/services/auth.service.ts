import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse, SignInRequest } from '../models/responses/signin';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/auth';
    private tokenKey = 'jwt_token';

    constructor(private http: HttpClient) { }

    signin(credentials: SignInRequest): Observable<SignInResponse> {
        return this.http.post<SignInResponse>(`${this.baseUrl}/signin`, credentials);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
