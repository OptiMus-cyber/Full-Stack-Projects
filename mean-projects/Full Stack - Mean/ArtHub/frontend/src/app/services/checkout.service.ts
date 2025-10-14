import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    private apiUrl = "http://localhost:4500/api";

    constructor(private http: HttpClient, private authService: AuthService) { }

    createOrder(orderData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/place-order`, orderData, {
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
    }

    placeOrder(orderData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/checkout`, orderData, {
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
    }

    confirmPayment(paymentData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/confirm-payment`, paymentData, {
            headers: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
    }
}
