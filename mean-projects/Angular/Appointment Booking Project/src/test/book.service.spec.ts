import { BookService } from '../app/book-appointment/book.service';
import {inject, TestBed} from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';

describe('BookService', () => {
    let service: BookService;
    let htc: HttpTestingController;


    const mockResponse = {
        "cName": "nick name",
        "address": "something something",
        "phoneNo": 9876543210,
        "id": 1
    }

    let bookingFormData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule, RouterTestingModule
            ],
            providers: [BookService]
        });
        htc = TestBed.inject(HttpTestingController);
        service = TestBed.inject(BookService);
    });

    beforeEach(() => {
        bookingFormData = {
            "cName": "nick name",
            "address": "something something",
            "phoneNo": 9876543210,
            "id": 1
        }
    });

    it('BS1- Checking whether called the  right url for bookAppointment', inject([HttpClient], (http) => {

      const spy = jest.spyOn(http, "post").mockReturnValue(of(mockResponse));
      service.bookAppointment(bookingFormData);
        let url = null;
        try {
            url = spy.mock.calls[0][0]
        } catch (e) {}
        expect(url).toBe("http://localhost:3000/bookings")

    }));

    it('BS2- bookAppointment() should be called using post method', inject([HttpClient], (http : HttpClient) => {
      const spy = jest.spyOn(http, "post").mockReturnValue(of(mockResponse));
      service.bookAppointment(bookingFormData);
        expect(spy).toHaveBeenCalled();
    }));
    it('BS3- getServices() should be called using get method', inject([HttpClient], (http: HttpClient) => {
        const spy = jest.spyOn(http, "get").mockReturnValue(of(mockResponse));
        service.getServices(1);
        expect(spy).toHaveBeenCalled();
    }))
    

});
