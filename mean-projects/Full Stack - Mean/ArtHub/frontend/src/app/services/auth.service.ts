import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4500/api/auth';

  constructor(private http: HttpClient, private router: Router) { };

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login Method
  login(credentails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentails);
  }

  // Save JWT Token
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Retrieve Token
  getToken() {
    return localStorage.getItem('token');
  }

  // Remove Token (Logout)
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if User is Logged In
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Handling token expiry
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decodedToken: any = jwtDecode(token);

    const expiryTime = decodedToken.exp*1000;

    return Date.now() > expiryTime;
  }

  // Auto logout
  autoLogout() {
    if(this.isTokenExpired()){
      this.logout();
      this.router.navigate(['/login']);
    }
  }

  // Identify user role
  getUserRole(): string | null {
    const token = this.getToken();

    if(!token) return null;

    const decodedToken: any = jwtDecode(token);

    return decodedToken.role;
  }

  // Identify user role
  getUserId(): string | null {
    const token = this.getToken();

    if(!token) return null;

    const decodedToken: any = jwtDecode(token);

    return decodedToken.id;
  }

  // Role matching
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  // Identify user name
  getUserName(): string | null {
    const token = this.getToken();

    if(!token) return null;

    const decodedToken: any = jwtDecode(token);

    return decodedToken.name;
  }
}
