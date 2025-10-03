import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreatServicesService {
  constructor(private http: HttpClient) { }
  
  
  serviceUrl= 'http://localhost:3000/service';


  getServices(): Observable<any> {
     /*
      1.It should send a GET Request to the URL http://localhost:3000/service/ 
    */
     
    return this.http.get<any>(this.serviceUrl);
  }

}