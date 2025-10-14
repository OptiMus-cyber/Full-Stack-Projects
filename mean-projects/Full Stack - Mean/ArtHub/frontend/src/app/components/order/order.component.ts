import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private toastService: ToastService) { };

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getPurchaseHistory().subscribe((data)=> {
        this.orders = data;
    });
  }
}
