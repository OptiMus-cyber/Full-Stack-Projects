import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistAuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {};

  canActivate(): boolean {
    if(this.authService.getUserRole() === 'artist'){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

  canLoad(): boolean {
    if(this.authService.getUserRole() === 'artist'){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
