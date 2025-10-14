import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promotions: any[] = [];
  artworks: any[] = [];
  filteredArtworks: any[] = [];
  categories: string[] = [];
  artists: string[] = [];
  selectedCategory: string = '';
  selectedArtist: string = '';
  searchQuery: string = '';
  debounceTimer: any = null;
  artworkDiscounts: any[] = [];

  constructor(private artworkService: ArtworkService, private router: Router, private promotionService: PromotionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.artworkDiscounts=[]
    this.loadArtworks();
    this.loadPromotions();
  }

  loadArtworks():void {
      this.artworkService.getAllArtworks({category:this.selectedCategory, artistId:this.selectedArtist, query:this.searchQuery}).subscribe(
          (data) => {
            this.artworks = data;
            this.filteredArtworks = data;
            this.extractFilters();
          },
          (error) => {
            console.error('Error fetching artworks:', error);
            this.artworks = [];
            this.filteredArtworks = [];
            this.extractFilters();
          }
      );
  }

  loadPromotions(): void {
    this.promotionService.getAllPromotions().subscribe((data)=> {
      this.promotions = data;
      data.forEach((x:any)=>{
        this.artworkDiscounts.push(x.discount?x.discount:null);
      })
      this.trackImpressions();
    }, (error) => {
      console.log("Error in fetching promotions:", error);
    })
  }

  extractFilters():void {
    this.categories = [...new Set(this.artworks.map((art)=>art.category))];
    this.artists = [...new Set(this.artworks.map((art)=>art.artistId.name))];
  }

  debounce():void {
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(()=>{
      this.loadArtworks();
    },1000);
  }

  filterArtworks():void {
    this.filteredArtworks = this.artworks.filter((art)=>{
      return (this.selectedCategory?art.category===this.selectedCategory:true) && (this.selectedArtist?art.artistId.name===this.selectedArtist:true);
    })
  }

  filterSearch():void {
    this.debounce();
    this.selectedCategory = '';
    this.selectedArtist = '';
  }

  viewDetails(artwork: any): void {
    const promotion = this.promotions.find((x)=>x.artworkId._id===artwork._id);
    if(promotion)this.trackClick(promotion._id);
    this.router.navigate(['/artwork', artwork._id]);
  }

  trackImpressions():void {
    this.promotions.forEach((promotion) => {
      this.promotionService.trackImpression(promotion._id).subscribe();
    })
  }

  trackClick(promotionId:string):void {
    this.promotionService.trackClick(promotionId).subscribe();
  }
}
