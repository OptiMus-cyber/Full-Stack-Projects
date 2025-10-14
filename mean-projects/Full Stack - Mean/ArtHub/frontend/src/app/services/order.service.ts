import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "http://localhost:4500/api";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPurchaseHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/purchase-history`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
