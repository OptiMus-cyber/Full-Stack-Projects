import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';


export const routes: Routes = [
  {
    path:'services',
    component: ServicesComponent
  },
  {
    path:'book-appointment/:id',
    component: BookAppointmentComponent
  },
  {
    path:'**',
    redirectTo:'/services',
    pathMatch:'full'
  }
];

/* Import the necessary files here */

/* 
  1. Configure the routes here to load the routed components
    -- for 'services' route path, it should load services component
    -- for 'book-appointment/:id' route path, it should load Book-Appointment component
  2. Any invalid route should redirect to home page
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
