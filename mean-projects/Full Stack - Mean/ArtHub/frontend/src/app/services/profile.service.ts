import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:4500/api/user'

  constructor(private http: HttpClient, private authService: AuthService) { };

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch-profile`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  updateProfile(data:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile`, data, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
