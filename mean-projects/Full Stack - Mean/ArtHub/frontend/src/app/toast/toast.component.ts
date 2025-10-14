import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit{
  toast: any = null;
  constructor(private toastService: ToastService) {};

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast)=>{
      this.toast=toast;
    });
  }
  
  closeToast() {
    this.toast = null;
  }
}
