import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductInterface} from "../../../shared/types/product.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{

  products: ProductInterface[] = []
  pSub! : Subscription
  rSub!: Subscription
  productName!: string

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products
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
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }
}
