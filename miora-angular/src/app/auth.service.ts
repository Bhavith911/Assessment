// src/app/services/auth.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/user/login';
  constructor(private http: HttpClient,private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password, expiresInMins: 30 });

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }
  logout() {
    // Remove the authentication token from local storage
    localStorage.removeItem('authToken');
    
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
