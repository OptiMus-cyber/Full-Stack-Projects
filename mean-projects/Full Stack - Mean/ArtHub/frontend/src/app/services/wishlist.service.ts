import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = "http://localhost:4500/api";

  constructor(private http: HttpClient, private authService: AuthService) { }

  addToWishlist(artworkId: string) {
    return this.http.post<any>(`${this.apiUrl}/wishlist/add`, {artworkId}, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  };

  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/wishlist`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  };

  checkWishlist(artworkId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/wishlist/check/${artworkId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  removeFromWishlist(artworkId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/wishlist/remove`, {artworkId}, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  };
}
