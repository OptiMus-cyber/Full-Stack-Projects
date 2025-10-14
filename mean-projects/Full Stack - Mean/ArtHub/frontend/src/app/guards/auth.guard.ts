import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {};

  canActivate():boolean {
    if(this.authService.isLoggedIn()) {
      if(this.authService.isTokenExpired()) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      } 
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }  

  canLoad():boolean {
    if(this.authService.isLoggedIn()) {
      if(this.authService.isTokenExpired()) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      } 
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }  
}
