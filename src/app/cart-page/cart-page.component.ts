import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {ProductInterface} from "../shared/types/product.interface";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{

  cartProducts: ProductInterface[] = []
  totalPrice = 0

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += +this.cartProducts[i].price
    }
  }

}
