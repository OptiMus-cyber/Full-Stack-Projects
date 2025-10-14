import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {};

  canActivate():boolean {
    if(this.authService.getUserRole() === 'buyer'){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

  canLoad():boolean {
    if(this.authService.getUserRole() === 'buyer'){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
