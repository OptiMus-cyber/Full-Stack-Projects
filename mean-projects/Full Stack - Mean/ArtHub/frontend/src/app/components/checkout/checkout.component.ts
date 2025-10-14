import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from 'src/app/services/artwork.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit{
    artwork: any;
    paymentMethod: string = "online";
    shipping = { fullName: '', phone: '', address: '' }
    processing = false;

    constructor( private route: ActivatedRoute, private artworkService: ArtworkService, private checkoutService: CheckoutService, private router: Router, private toastService: ToastService, private promotionService: PromotionService) {};

    ngOnInit(): void {
        const artworkId = this.route.snapshot.queryParamMap.get('artworkId');
        if(artworkId) {
            this.fetchArtworkDetails(artworkId);
        } else {
            this.toastService.showToast("Invalid artwork selected.", "danger");
            this.router.navigate(['/']);
        }
    }

    fetchArtworkDetails(id: string) {
        this.artworkService.getArtworkDetails(id).subscribe({
          next: (res) => {
            this.artwork = res;
          },
          error: (err) => {
            this.toastService.showToast( err.error.message , "danger");
            this.router.navigate(['/']);
          }
        })
    }

    confirmPurchase() {
      if(!this.shipping.fullName || !this.shipping.phone || !this.shipping.address) {
          this.toastService.showToast( "Please fill all shipping details." , "danger");
          return;
      }

      this.processing = true;

      const orderData = {
        artworkId: this.artwork._id,
        artistId: this.artwork.artistId._id,
        price: this.artwork.price,
        shipping: this.shipping,
        paymentMethod: this.paymentMethod
      }

      this.checkoutService.createOrder(orderData).subscribe({
        next: (res) => {
          this.promotionService.trackSale(orderData.artworkId).subscribe();
          this.toastService.showToast(res.message, "success");
          this.router.navigate(['/orders']);
        },
        error: (err) => {
          this.toastService.showToast(err.error.message, "danger");
        },
        complete: () => {
          this.processing = false;
        }
      })
    }
}
