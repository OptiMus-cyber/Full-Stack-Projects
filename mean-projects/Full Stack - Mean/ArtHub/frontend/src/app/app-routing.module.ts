import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CommissionComponent } from './components/commission/commission.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UploadArtworkComponent } from './components/upload-artwork/upload-artwork.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomWorkComponent } from './components/custom-work/custom-work.component';
import { CustomWorkHistoryComponent } from './components/custom-work-history/custom-work-history.component';
import { ArtistAuthGuard } from './guards/artist-auth.guard';
import { BuyerAuthGuard } from './guards/buyer-auth.guard';
import { PromotionComponent } from './components/promotion/promotion.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full"
  },
  {
    path: "artwork/:id",
    component: ArtworkComponent,
    pathMatch: "full"
  },
  {
    path: "profile",
    component: ProfileComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "upload-artwork",
    component: UploadArtworkComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, ArtistAuthGuard]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, BuyerAuthGuard]
  },
  {
    path: "wishlist",
    component: WishlistComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, BuyerAuthGuard]
  },
  {
    path: "custom-work",
    component: CustomWorkComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, BuyerAuthGuard]
  },
  {
    path: "custom-work-history",
    component: CustomWorkHistoryComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, BuyerAuthGuard]
  },
  {
    path: "commission",
    component: CommissionComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, ArtistAuthGuard]
  },
  {
    path: "orders",
    component: OrderComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, BuyerAuthGuard]
  },
  {
    path: "promotions",
    component: PromotionComponent,
    pathMatch: "full",
    canActivate: [AuthGuard, ArtistAuthGuard]
  },
  {
    path: "**",
    redirectTo: '/',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
