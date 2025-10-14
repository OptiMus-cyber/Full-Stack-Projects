import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ToastService } from 'src/app/services/toast.service';

declare let bootstrap:any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit{
  promotions: any[] = [];
  artworks: any[] = [];

  newPromotion = {
    title: "",
    description: "",
    artworkId: "",
    startDate: "",
    endDate: "",
    discount: "",
    artistId: this.authService.getUserId()
  }

  modalInstance: any;

  constructor(private promotionService: PromotionService, private authService: AuthService, private artworkService: ArtworkService, private toastService: ToastService){};

  ngOnInit(): void {
    this.loadPromotions();
    this.loadArtworks();
  }

  loadPromotions(): void {
    this.promotionService.getPromotions(this.newPromotion.artistId).subscribe((data)=> {
      this.promotions = data;
    }, (error) => {
      console.log("Error in fetching promotions:", error);
    })
  }

  loadArtworks(): void {
    this.artworkService.getAllArtworks({query:""}).subscribe((data)=> {
      this.artworks = data.filter((artwork)=>artwork.artistId._id === this.newPromotion.artistId);
    }, (error) => {
      console.log("Error in fetching artworks:", error);
    })
  }

  openModal(): void {
    this.modalInstance = new bootstrap.Modal(document.getElementById("promotionModal"));
    this.modalInstance.show();
  }

  closeModal(): void {
    if(this.modalInstance){
      this.modalInstance.hide();
    }
  }

  createPromotion(): void {
    this.promotionService.createPromotion(this.newPromotion).subscribe((data)=>{
      this.promotions.push(data);
      this.toastService.showToast("Promotion Created!", "success");
      this.resetForm();
      this.closeModal();
    }, (error)=> {
      if(error.status>=400 && error.status<500) {
        this.toastService.showToast(error.error.message, "warning");
      }
      if(error.status>=500 && error.status<600) {
        this.toastService.showToast(error.error.message, "danger");
      }
      console.log("Error in creating promotion:", error);
    })
  }

  deletePromotion(id:string):void {
    this.promotionService.deletePromotion(id).subscribe(()=> {
      this.promotions = this.promotions.filter((p)=>p._id !== id);
    },(error) => {
      if(error.status>=400 && error.status<500) {
        this.toastService.showToast(error.error.message, "warning");
      }
      if(error.status>=500 && error.status<600) {
        this.toastService.showToast(error.error.message, "danger");
      }
    })
  }

  resetForm(): void {
    this.newPromotion = {
      title: "",
      description: "",
      artworkId: "",
      startDate: "",
      endDate: "",
      discount: "",
      artistId: this.authService.getUserId()
    }
  }
}
