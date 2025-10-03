import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { GreatServicesService } from '../app/services/great-services.service';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from '../app/services/services.component'
import { ElementRef } from '@angular/core';

import { BookAppointmentComponent } from '../app/book-appointment/book-appointment.component';

class GreatServicesStub{

  
  bookAppointment(booking: any): Observable <any>{
    return new Observable()  ;
    }
  getServices(id: number): Observable <any>{
    return new Observable()  ;
    }

}

describe('BookAppointmentComponent', () => {
  let component: BookAppointmentComponent;
  let fixture: ComponentFixture<BookAppointmentComponent>;
  let homecomponent: ServicesComponent;
  let homefixture: ComponentFixture<ServicesComponent>;
  let greatServicesService;
  let cName, address, phoneNo;
  let  phoneNoError, customerNameError,addressError;
  let button: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ BookAppointmentComponent , ServicesComponent ],
      providers: [{ provide: GreatServicesService, useClass: GreatServicesStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentComponent);
    component = fixture.componentInstance;
    homefixture = TestBed.createComponent(ServicesComponent);
    homecomponent = homefixture.componentInstance;
    greatServicesService = TestBed.get(GreatServicesService);
 
  });


  beforeEach(() => {
    cName = component.appointmentForm.controls['cName'];
    address = component.appointmentForm.controls['address'];
    phoneNo = component.appointmentForm.controls['phoneNo'];
    component.services =       {
      "id": 1,
      "image": "assets/airConditioner.jpg",
      "name": "Air Conditioner",
      "desc": "We have expert technicians over a wide range of locations",
      "charges": 1500,
      "overallRating": 4,
      "availability": "Currently service is available"
    },
    fixture.detectChanges();
  });
  
  it('BAC1- Should have proper name of service', () => {

    component.services= {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
    fixture.detectChanges();
    let tag = fixture.nativeElement.querySelector('#title').textContent
    expect(tag).toContain(' Washing Machine service')
  });

  it('BAC2- Should render proper message', () => {

    component.services= {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
    fixture.detectChanges();
    let tag = fixture.nativeElement.querySelector('#message').textContent
    expect(tag).toContain('Get your work done with us')
  });

 

  

  // it('BAC4- Link should have proper message rendered', () => {

  //   component.services= {
  //     "id": 2,
  //     "image": "assets/washingMachine.jpg",
  //     "name": "Washing Machine",
  //     "desc": "We serve over a wide range of washing machines",
  //     "charges": 500,
  //     "overallRating": 4.5,
  //     "availability": "Currently service is not available"
  //   },
  //   fixture.detectChanges();
  //   let tag = fixture.nativeElement.querySelector('#checkForAvailability').textContent
  //   expect(tag).toContain('Check for Services Availibility.')
  // });
  it('BAC4- to route the page to the correct direction',()=>{
    fixture.detectChanges();
    let buttonTag = fixture.debugElement.query(By.css('#checkForAvailability'))
    expect(buttonTag.attributes['routerLink']).toMatch('/services')
})
  
  
  it('BAC5- Should print the availability', () => {
    component.services= {
      "id": 2,
      "image": "assets/washingMachine.jpg",
      "name": "Washing Machine",
      "desc": "We serve over a wide range of washing machines",
      "charges": 500,
      "overallRating": 4.5,
      "availability": "Currently service is not available"
    },
    fixture.detectChanges();
    let tag = fixture.nativeElement.querySelector('#availability').textContent
    expect(tag).toContain('Currently service is not available')
  });
  
  it('BAC6- phoneNo field should have pattern error for phoneNo less than 10 digits', () => {
    component.appointmentForm.controls['phoneNo'].setValue("99999999999");
    fixture.detectChanges();
    expect(component.appointmentForm.controls['phoneNo'].errors['pattern']).toBeTruthy();
  });
 

  it('BAC7- name field should have required error for empty value', () => {
    component.appointmentForm.controls['cName'].setValue("");
    component.appointmentForm.controls['cName'].markAsDirty();
    fixture.detectChanges();
    expect(component.appointmentForm.controls['cName'].errors['required']).toBeTruthy();
  }); 

  
  it('BAC7a- customername should not have both required and customername Error',()=>{
    component.appointmentForm.controls['cName'].setValue('abcdefd');
    component.appointmentForm.controls['cName'].markAsDirty();
    fixture.detectChanges();
    component.appointmentForm.controls['cName'].setValue('');
    fixture.detectChanges();
    customerNameError= fixture.debugElement.nativeElement.querySelector('#customerNameError');
    expect(customerNameError.textContent.toLowerCase()).toMatch(/field required/);
    expect(customerNameError.textContent.toLowerCase()).not.toMatch('Name can have only alphabets')

})

  it('BAC8- name field should have pattern error for name less than 4 characters', () => {
    component.appointmentForm.controls['cName'].setValue("hhh");
    fixture.detectChanges();
    expect(component.appointmentForm.controls['cName'].errors['pattern']).toBeTruthy();
  }); 
   it('BAC9- name field should have pattern error for name more than 10 characters', () => {
    component.appointmentForm.controls['cName'].setValue("hhhhhhhhhhh");
    fixture.detectChanges();
    expect(component.appointmentForm.controls['cName'].errors['pattern']).toBeTruthy();
  });

  it('BAC10- name error message should be displayed in appropriate tag for invalid input', () => {
    component.appointmentForm.controls['cName'].setValue('kak');
    component.appointmentForm.controls['cName'].markAsDirty();
    fixture.detectChanges();
    let customerNameError = fixture.debugElement.nativeElement.querySelector('#customerNameError');
    expect(customerNameError).toBeTruthy();
  });

  it('BAC11- Address field should have required error for empty value', () => {
    component.appointmentForm.controls['address'].setValue("");
    component.appointmentForm.controls['address'].markAsDirty();
    fixture.detectChanges();
    expect(component.appointmentForm.controls['address'].errors['required']).toBeTruthy();
  });



  it('BAC12- Address error message should be displayed in appropriate tag for invalid input', () => {
    component.appointmentForm.controls['address'].setValue("");
    component.appointmentForm.controls['address'].markAsDirty();
    fixture.detectChanges();
    let addressError = fixture.debugElement.nativeElement.querySelector('#addressError');
    expect(addressError).toBeTruthy();
  });

  it('BAC13- Phone No. field should have required error for empty value', () => {
    component.appointmentForm.controls['phoneNo'].setValue("");
    component.appointmentForm.controls['phoneNo'].markAsDirty();
    fixture.detectChanges();
    expect(component.appointmentForm.controls['phoneNo'].errors['required']).toBeTruthy();
  });
  it('BAC13a- Phone number field should not have both required and phone number Error',()=>{
    component.appointmentForm.controls['phoneNo'].setValue('abcdefd');
    component.appointmentForm.controls['phoneNo'].markAsDirty();
    fixture.detectChanges();
    component.appointmentForm.controls['phoneNo'].setValue('');
    fixture.detectChanges();
    phoneNoError= fixture.debugElement.nativeElement.querySelector('#phoneNoError');
    expect( phoneNoError.textContent.toLowerCase()).toMatch(/field required/);
    expect( phoneNoError.textContent.toLowerCase()).not.toMatch('it should start with 7 or 8 or 9 and have only 10 digits')

})


  it('BAC14- phoneNo field should have pattern error for phoneNo less than 10 digits', () => {
    component.appointmentForm.controls['phoneNo'].setValue("922222");
    fixture.detectChanges();
    expect(component.appointmentForm.controls['phoneNo'].errors['pattern']).toBeTruthy();
  });

  

  it('BAC15- phoneNo error message should be displayed in appropriate tag for invalid input', () => {
    component.appointmentForm.controls['phoneNo'].setValue('0');
    component.appointmentForm.controls['phoneNo'].markAsDirty();
    fixture.detectChanges();
    let phoneNoError = fixture.debugElement.nativeElement.querySelector('#phoneNoError');
    expect(phoneNoError).toBeTruthy();
  });

  it('BAC16- Book Button should be disabled initially', () => {
    fixture.detectChanges();
    let buttonTag = fixture.debugElement.query(By.css('#confirmAppointment'));
    expect(buttonTag.properties['disabled']).toBe(true);
  });

  it('BAC17- Book Appointment event button should be enabled when all fields have valid input', () => {
    component.appointmentForm.controls['cName'].setValue("kartik")
    component.appointmentForm.controls['phoneNo'].setValue('999999999');
    component.appointmentForm.controls['address'].setValue("something something");
    fixture.detectChanges();
    let buttonTag = fixture.debugElement.query(By.css('#confirmAppointment'));
    expect(buttonTag.properties['disabled']).toBe(true);
  });

  it('BAC18- Should invoke book method on click of book button', () => {
    component.appointmentForm.controls['cName'].setValue("kartik")
    component.appointmentForm.controls['phoneNo'].setValue('9999999999');
    component.appointmentForm.controls['address'].setValue("something something");
 
    fixture.detectChanges();
    let bookSpy = jest.spyOn(component, 'bookAppointment');
    let formTag = fixture.debugElement.nativeElement.querySelector('form');
    var event = new Event('ngSubmit');
    formTag.dispatchEvent(event)
    fixture.detectChanges();
    expect(bookSpy).toHaveBeenCalled();
  });


  it('BAC19- Should invoke book method on click of bookAppointment button', () => {

    component.appointmentForm.controls['cName'].setValue("kartik")
    component.appointmentForm.controls['phoneNo'].setValue('9999999999');
    component.appointmentForm.controls['address'].setValue("something something");
 
    fixture.detectChanges();
    let buttonTag = fixture.debugElement.query(By.css('#confirmAppointment'));
    expect(buttonTag?.properties['disabled'])?.toBe(false);
  });

  it('BAC20- Error Message should be displayed in appropriate Tag', () => {
    component.errorMessage = 'Failed to book an appointment';
    fixture.detectChanges();
    let errorTag = fixture.debugElement.nativeElement.querySelector('#errorMessage');
    expect(errorTag.textContent).toMatch(/Failed to book an appointment/);
  });

  it('BAC21- Success Message should be displayed in appropriate Tag', () => {
    component.successMessage = 'We have sucessfully registered your complaint';
    fixture.detectChanges();
    let successTag = fixture.debugElement.nativeElement.querySelector('#successMessage');
    expect(successTag.textContent).toMatch(/We have sucessfully registered your complaint/);
  });
  it('BAC22- customerName error message tag should have alert danger class', () => {

    component.appointmentForm.controls['cName'].setValue('');

    component.appointmentForm.controls['cName'].markAsDirty();

    fixture.detectChanges();

    let st = fixture.debugElement.query(By.css('#customerNameError'))

    expect(st.properties['className']).toMatch(/alert-danger/)

  });
  it('BAC23- Address error message tag should have alert danger class', () => {

    component.appointmentForm.controls['address'].setValue('');

    component.appointmentForm.controls['address'].markAsDirty();

    fixture.detectChanges();

    let st = fixture.debugElement.query(By.css('#addressError'))

    expect(st.properties['className']).toMatch(/alert-danger/)

  });
  it('BAC24- phone no error message tag should have alert danger class', () => {

    component.appointmentForm.controls['phoneNo'].setValue('');

    component.appointmentForm.controls['phoneNo'].markAsDirty();

    fixture.detectChanges();

    let st = fixture.debugElement.query(By.css('#phoneNoError'))

    expect(st.properties['className']).toMatch(/alert-danger/)

  }); 


  it('BAC25- component error message tag should have text danger class', () => {

    component.errorMessage = 'Failed to book an appointment';

    fixture.detectChanges();

    let st = fixture.debugElement.query(By.css('#errorMessage'))

    expect(st.properties['className']).toMatch(/text-danger/)

  }); 


  it('BAC26- successMessage tag should have text success class', () => {

    component.successMessage = 'We have sucessfully registered your complaint';

    fixture.detectChanges();

    let st = fixture.debugElement.query(By.css('#successMessage'))

    expect(st.properties['className']).toMatch(/text-success/)

  }); 

});