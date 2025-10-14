import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private apiUrl = "http://localhost:4500/api/artwork";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllArtworks(filter:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fetch?query=${filter.query}`);
  }

  getArtworkDetails(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
  }

  uploadArtwork(formData: FormData): Observable<any>{
    return this.http.post(`${this.apiUrl}/upload`, formData , {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
