import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from "./book.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  
      services:any;
      appointmentForm: FormGroup = new FormGroup({});
      successMessage: string = "";
      errorMessage: string ="";
      id: any="";
      
  constructor( private aR: ActivatedRoute,private formbuilder: FormBuilder, 
    private bookService: BookService) { }
    

  ngOnInit(): void {
    this.id = this.aR.snapshot.params.id;

    /*
      Invoke the getServices() method of bookService which returns an observable as a response and pass id as a parameter 
      and store the response 
    */
    this.bookService.getServices(this.id).subscribe(
      (res)=> this.services=res[0],
    );

    /*
      // add the following validations provided for the inputs field
      //   cName:- default: '', Validators: required, pattern - should have only alphabets with minimum 4 and maximum 10 letters,
      //   address:- default: '', Validators: required,
      //   phoneNo:- default: '', Validators: required, pattern-it should start with 7 or 8 or 9 and have only 10 digits.
    */
    this.appointmentForm=this.formbuilder.group({
      cName:['',[Validators.required,Validators.pattern(/^[a-zA-Z]{4,10}$/)]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required,Validators.pattern(/^[7-9][0-9]{9}$/)]]
    })

     
  }
  

  bookAppointment() {
    this.successMessage = "";
    this.errorMessage = "";
    this.bookService.bookAppointment(this.appointmentForm.value).subscribe((data) => {
      this.successMessage = "We have sucessfully registered your complaint";
    }, (error) => {
      this.errorMessage = 'Failed to book an appointment'
    })

  }

}
