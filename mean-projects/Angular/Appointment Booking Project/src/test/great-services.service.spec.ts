import {inject, TestBed} from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {GreatServicesService} from '../app/services/great-services.service';

describe('GreatServicesService', () => {
    let service: GreatServicesService;
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
            providers: [GreatServicesService]
        });
        htc = TestBed.inject(HttpTestingController);
        service = TestBed.inject(GreatServicesService);
    });

    beforeEach(() => {
        bookingFormData = {
            "cName": "nick name",
            "address": "something something",
            "phoneNo": 9876543210,
            "id": 1
        }
    });
    it('GSS1- getServices() should be called using get method', inject([HttpClient], (http: HttpClient) => {
        const spy = jest.spyOn(http, "get").mockReturnValue(of(mockResponse));
        service.getServices();
        expect(spy).toHaveBeenCalled();
    }))


});
