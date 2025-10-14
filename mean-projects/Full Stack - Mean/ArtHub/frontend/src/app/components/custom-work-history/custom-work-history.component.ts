import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommissionService } from 'src/app/services/commission.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-custom-work-history',
  templateUrl: './custom-work-history.component.html',
  styleUrls: ['./custom-work-history.component.css']
})
export class CustomWorkHistoryComponent implements OnInit{
    commissions: any[] =[];
    action:boolean = true;
    private socket = io("http://localhost:4500");

    constructor(private commissionService: CommissionService, private authService: AuthService) {};

    ngOnInit(): void {
        this.loadBuyerCommissions();
        this.socket.on(`commission-update-${this.authService.getUserId()}`, () => {
            this.loadBuyerCommissions();
            // const index = this.commissions.findIndex(c=> c._id === updatedCommission._id);
            // if(index!==-1) {
            //   this.commissions[index]=updatedCommission;
            //   if(updatedCommission.status="payment_requested") {
            //     this.action = true;
            //   }
            // }
        })
    }

    loadBuyerCommissions() {
        this.commissionService.loadBuyerCommissions().subscribe((data) => {
            this.commissions = data;
            this.action = !!this.commissions.find((x)=>x.status=='payment_requested')
        })
    }

    makePayment(commissionId: string): void {
      this.commissionService.makePayment(commissionId).subscribe(() => {
        const index = this.commissions.findIndex(c=> c._id === commissionId);
          if(index!==-1) {
            this.commissions[index].status="Work in progress";
          }
      })
    }

    rejectCommission(commissionId: any) {
      this.commissionService.updateCommissionStatus(commissionId, "declined").subscribe(() => {
        this.loadBuyerCommissions();
      })
    }
}
