import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookAppointmentComponent } from '../app/book-appointment/book-appointment.component';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { GreatServicesService } from "../app/services/great-services.service";

import { ServicesComponent } from '../app/services/services.component';

 class GreatServicesStub{

  
    bookAppointment() {
      return new Observable()  
      }
    getServices() {
      return new Observable()             
      }
  
 }

describe('ServicesComponent', () => {
  let component1: ServicesComponent;
  let fixture1: ComponentFixture<ServicesComponent>;
  let component2: BookAppointmentComponent;
  let fixture2: ComponentFixture<BookAppointmentComponent>;
  let homeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesComponent , BookAppointmentComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [{ provide: GreatServicesService, useClass: GreatServicesStub }]
  
    })
    .compileComponents();
  });
  let router;
  beforeEach(() => {
    fixture1 = TestBed.createComponent(ServicesComponent);
    component1 = fixture1.componentInstance;
    fixture2 = TestBed.createComponent(BookAppointmentComponent);
    component2 = fixture2.componentInstance;
    homeService = TestBed.get(GreatServicesService);
    fixture1.detectChanges();
  });


  it('SC1- all the Services are rendered in the cards', () => {
    component1.serviceArray = [
     {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
  ]
    fixture1.detectChanges();
    const serviceCards = fixture1.debugElement.queryAll(By.css('.card'));
    expect(serviceCards.length).toBe(component1.serviceArray.length)
  })


  it('SC2- Should have proper name with title casing', () => {
    component1.serviceArray = [
     {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
  ]
    fixture1.detectChanges();

    let tag = fixture1.nativeElement.querySelector('.card-title').textContent

    expect(tag).toContain(' Air Conditioner ')
  })
  it('SC3- Should have proper name with title casing', () => {
    component1.serviceArray = [
     {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
  ]
    fixture1.detectChanges();

    let tag = fixture1.nativeElement.querySelector('#description').textContent
    expect(tag).toContain('We have expert technicians over a wide range of locations')
  })
  
  it('SC4- checking the charges', () => {
    component1.serviceArray = [
        {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    ]
      fixture1.detectChanges();
    let tag = fixture1.nativeElement.querySelector('#charges').textContent
    expect(tag).toContain('₹1,500')

  })
  it('SC5- checking the rating', () => {
    component1.serviceArray = [
        {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    ]
    fixture1.detectChanges();
    let tag = fixture1.nativeElement.querySelector('#rating').textContent
    expect(tag).toContain('4')

  })
  


  it('SC6- should have proper .. and alt attributes in img tag', () => {
    component1.serviceArray = [
      {
        "id": 1,
        "image": "assets/airConditioner.jpg",
        "name": "Air Conditioner",
        "desc": "We have expert technicians over a wide range of locations",
        "charges": 1500,
        "overallRating": 4,
        "availability": "Currently service is available"
      },]
    fixture1.detectChanges();
    const images = fixture1.debugElement.queryAll(By.css('#serviceImage'));
    expect(images[0].properties.src).toEqual(component1.serviceArray[0].image)
    expect(images[0].properties.alt).toMatch("1")
  })

  it('SC7- should display charges with proper currency code at proper place', () => {
    component1.serviceArray = [
      {
        "id": 1,
        "image": "assets/airConditioner.jpg",
        "name": "Air Conditioner",
        "desc": "We have expert technicians over a wide range of locations",
        "charges": 1500,
        "overallRating": 4,
        "availability": "Currently service is available"
      },
      {
        "id": 2,
        "image": "assets/washingMachine.jpg",
        "name": "Washing Machine",
        "desc": "We serve over a wide range of washing machines",
        "charges": 500,
        "overallRating": 4.5,
        "availability": "Currently service is not available"
      },
    ]
    fixture1.detectChanges();
    const service = fixture1.debugElement.nativeElement.querySelectorAll('#charges');
    expect(service[0].textContent).toMatch('Charges: ₹1,500.00');

})

it('SC8- Error Message should be displayed in appropriate Tag', () => {
  component1.errorMessage = "Sorry no Services are Available at this moment!!!";
  fixture1.detectChanges();
  let errorTag = fixture1.debugElement.nativeElement.querySelector('#errorMessage');
  expect(errorTag.textContent).toMatch(/Sorry no Services are Available at this moment!!!/);
});
it('SC9- component error message tag should have text danger class', () => {

  component1.errorMessage = 'Failed to book an appointment';

  fixture1.detectChanges();

  let st = fixture1.debugElement.query(By.css('#errorMessage'))

  expect(st.properties['className']).toMatch(/text-center/)

}); 

});
