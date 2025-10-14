import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { CommissionService } from 'src/app/services/commission.service';

declare let bootstrap: any;

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit{
    commissions: any[] =[];
    selectedCommission: any = null;
    commissionPrice: number = 0;
    private socket = io("http://localhost:4500");

    constructor(private commissionService: CommissionService, private authService: AuthService) {};

    ngOnInit(): void {
        this.loadArtistCommissions();
        this.socket.on(`commission-update-${this.authService.getUserId()}`, () => {
          this.loadArtistCommissions();
        })
    }

    loadArtistCommissions() {
        this.commissionService.loadArtistCommissions().subscribe((data) => {
            this.commissions = data;
        })
    }

    openPriceModal(commission:any): void {
      this.selectedCommission = commission;
      this.commissionPrice = 0;

      // Open Bootstrap Modal
      const modalElement = document.getElementById('priceModal');
      if(modalElement) {
        new bootstrap.Modal(modalElement).show();
      }
    }

    submitPrice(event: Event): void {
      event.preventDefault();
      if(this.selectedCommission && this.commissionPrice>0) {
        this.commissionService.updateCommissionStatus(this.selectedCommission._id, "payment_requested", this.commissionPrice).subscribe(() => {
          this.selectedCommission = null;
          this.loadArtistCommissions();
        })
      }
    }

    acceptCommission(commissionId: any) {
        this.commissionService.updateCommissionStatus(commissionId, "accepted", 200).subscribe(() => {
          this.loadArtistCommissions();
        })
    }

    rejectCommission(commissionId: any) {
      this.commissionService.updateCommissionStatus(commissionId, "declined").subscribe(() => {
        this.loadArtistCommissions();
      })
    }

    markWorkCompleted(commissionId: string): void {
      this.commissionService.updateCommissionStatus(commissionId, "completed").subscribe(() =>{
        this.loadArtistCommissions();
      })
    }
}
