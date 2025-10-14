import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = "http://localhost:4500/api/commission";
  private socket = io("http://localhost:4500");

  constructor(private http: HttpClient, private authService: AuthService) { }

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/artists`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  loadArtistCommissions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/artist`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  loadBuyerCommissions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/buyer`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  updateCommissionStatus(commissionId: string, status: string, price?: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${commissionId}`, { status, price }, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  requestCustomWork(data: any): Observable<any> {
    this.socket.emit("new-commission", data);
    return this.http.post(`${this.apiUrl}/request`, data, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  makePayment(commissionId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pay/${commissionId}`, {}, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  onNewCommission(artistId: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(`commission-update-${artistId}`,(data:any) => {
        observer.next(data);
      });
    });
  }
}
