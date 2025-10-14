import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';

const socket = io("http://localhost:4500");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title:string = 'ArtHub';
  previewImage: string | ArrayBuffer | null | undefined = null;

  constructor(public router:Router, public authService: AuthService,private profileService: ProfileService) {};

  ngOnInit(): void {
    this.loadProfile();
    socket.on("statusUpdated", (data) => {
      console.log("Updated status:", data);
    })
  }

  logout(): void {
    this.authService.logout();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.previewImage = data.profilePicture;
      }
    )
  }
}
