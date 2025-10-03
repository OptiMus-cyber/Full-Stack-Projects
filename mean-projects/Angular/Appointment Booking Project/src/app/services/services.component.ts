import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GreatServicesService } from './great-services.service';
import { Service } from '../services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  
   constructor(private greatServicesService: GreatServicesService, private router: Router) { }
 
 
  serviceArray: Service[] = [];
  errorMessage: string = "";


  ngOnInit(): void {
 
    /*
      Invoke the getServices() method of greatServicesService which returns an observable as a response
      In success case, assign the response value to serviceArray property
      set the errorMessage as "Sorry no Services are Available at this moment!!!"
      This method should be invoked on load of the component
    */
      this.greatServicesService.getServices().subscribe((response) => {
     
        this.serviceArray = response;
      }, (error) => {
        this.errorMessage = "Sorry no Services are Available at this moment!!!"
      })
  }

  showAppointmentForm(id: any) {

      this.router.navigate(["/book-appointment/",id])
  }
}
