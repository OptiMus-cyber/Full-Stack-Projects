import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


  



function Of(): Observable<any> {
  throw new Error('Function not implemented.');
}


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  bookingUrl='http://localhost:3000/bookings';
  serviceUrl= 'http://localhost:3000/service/';

  bookAppointment(bookingObj: any): Observable<any> {
        /*
      1.It should send a POST Request to the URL http://localhost:3000/bookings/ 
        by passing bookingObj as request body
      2.The API call returns an Observable as a response, and the same value should be 
        returned from the function
    */
       
    return this.http.post(this.bookingUrl, bookingObj);
  }

  getServices(id: number):Observable<any>{
    /*
      1.It should send a GET Request to the URL http://localhost:3000/service/ 
      2.The API call returns an Observable as a response, and the same value should be 
        returned from the function
    */
       
    return this.http.get<any>(this.serviceUrl+'?id='+id);
  }
  
}
