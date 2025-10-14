import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ToastService } from 'src/app/services/toast.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit{
    artwork:any;
    selectedImage: string = '';
    inWishlist: boolean = false;
    loading = false;
    promotion: any = null;

    constructor(private route: ActivatedRoute, private artworkService: ArtworkService, private router: Router, private toastService: ToastService, private wishlistService: WishlistService, public authService: AuthService, private promotionService: PromotionService) {};

    ngOnInit(): void {
      const artworkId = this.route.snapshot.paramMap.get('id');
      if(artworkId) {
          this.fetchArtworkDetails(artworkId);
          this.loadPromotions(artworkId);
      }
    }

    loadPromotions(artworkId: any): void {
      this.promotionService.getAllPromotions().subscribe((data)=> {
        this.promotion = data.find((x:any)=>x.artworkId._id===artworkId);
      }, (error) => {
        console.log("Error in fetching promotions:", error);
      })
    }

    fetchArtworkDetails(id: string) {
      this.loading = true;
      this.artworkService.getArtworkDetails(id).subscribe({
        next: (res) => {
          this.artwork = res;
          if(res.images.length > 0) {
            this.selectedImage = res.images[0];
          }
          this.loading = false;
        },
        error: (err) => {
          this.toastService.showToast(err.error.message, "danger");
          this.loading = false;
        }
      });
      this.checkWishlistStatus(id);
    }

    changeImage(image: string) {
        this.selectedImage = image;
    }

    checkWishlistStatus(artworkId: string) {
      this.wishlistService.checkWishlist(artworkId).subscribe((res) => {
        this.inWishlist = res.inWishlist;
      });
    }

    toggleWishlist() {
      if(this.inWishlist) {
        this.wishlistService.removeFromWishlist(this.artwork._id).subscribe(() => {
          this.inWishlist = false;
        });
      } else {
        this.wishlistService.addToWishlist(this.artwork._id).subscribe(() => {
          this.inWishlist = true;
        })
      }
    }

    purchaseArtwork() {
      this.router.navigate(['/checkout'], {queryParams: {artworkId: this.artwork._id}});
    }
}
