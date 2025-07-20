import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Update the import path below if your environment file is located elsewhere
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    // Check if the JWT token exists in localStorage
    return !!localStorage.getItem('token');
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}