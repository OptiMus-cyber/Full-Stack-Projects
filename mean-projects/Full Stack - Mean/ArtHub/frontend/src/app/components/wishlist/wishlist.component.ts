import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlist: any[] = [];

  constructor(private wishlistService: WishlistService, private router: Router) {};

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe((data) => {
      this.wishlist = data;
    },()=>{
      this.wishlist=[];
    });
  }

  removeFromWishlist(artworkId: string) {
    this.wishlistService.removeFromWishlist(artworkId).subscribe(()=>{
      this.loadWishlist();
    });
  }

  viewDetails(artworkId: any): void {
    this.router.navigate(['/artwork', artworkId]);
  }
}
