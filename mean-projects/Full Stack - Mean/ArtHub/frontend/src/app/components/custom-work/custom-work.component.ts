import { Component, OnInit } from '@angular/core';
import { CommissionService } from 'src/app/services/commission.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-custom-work',
  templateUrl: './custom-work.component.html',
  styleUrls: ['./custom-work.component.css']
})
export class CustomWorkComponent implements OnInit {
    artists: any[] = [];
    selectedArtist: any = null;
    description: string = "";
    artistCommissions: any[] = [];

    constructor(private commissionService: CommissionService, private toastService: ToastService) {};

    ngOnInit(): void {
      this.loadArtists();
    }

    loadArtists() {
      this.commissionService.getArtists().subscribe((data) => {
        this.artists = data;
      });
    }

    openModal(artist: any) {
      this.selectedArtist = artist;

      this.commissionService.onNewCommission(artist._id).subscribe((commission)=> {
        this.artistCommissions.push(commission);
        this.toastService.showToast("New commission request received!", "success");
      })
    }

    requestCustomWork() {
      if(this.selectedArtist && this.description) {
        this.commissionService.requestCustomWork({ artistId: this.selectedArtist._id, description: this.description}).subscribe(() => {
            this.toastService.showToast("Request sent successfully!", "success");
            this.description="";
        }, () => {
            this.toastService.showToast("Request failed!", "danger");
            this.description="";
        })
      }
    }
}
