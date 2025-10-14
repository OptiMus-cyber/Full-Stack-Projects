import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CommissionComponent } from './components/commission/commission.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UploadArtworkComponent } from './components/upload-artwork/upload-artwork.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomWorkComponent } from './components/custom-work/custom-work.component';
import { CustomWorkHistoryComponent } from './components/custom-work-history/custom-work-history.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ArtworkComponent,
    WishlistComponent,
    CommissionComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    UploadArtworkComponent,
    CheckoutComponent,
    CustomWorkComponent,
    CustomWorkHistoryComponent,
    PromotionComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
