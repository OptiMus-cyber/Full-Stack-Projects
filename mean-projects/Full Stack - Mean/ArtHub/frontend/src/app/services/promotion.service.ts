import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'http://localhost:4500/api/promotion'

  constructor(private http: HttpClient, private authService: AuthService) { };

  createPromotion(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getPromotions(artistId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/artist/${artistId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getAllPromotions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  updatePromotion(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  deletePromotion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getPromotionPerformance(artistId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/performance/${artistId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  trackImpression(promotionId:string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-impressions/${promotionId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  trackClick(promotionId:string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-clicks/${promotionId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  trackSale(promotionId:string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-sales/${promotionId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
