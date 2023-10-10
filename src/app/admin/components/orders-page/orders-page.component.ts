import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../../shared/services/order.service";
import {OrderInterface} from "../../../shared/types/order.interface";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy{
  orders: OrderInterface[] = []
  pSub! : Subscription
  rSub!: Subscription
  orderName!: string

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnDestroy() {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.rSub){
      this.rSub.unsubscribe()
    }
  }

  removeProduct(id: string) {
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }
}
