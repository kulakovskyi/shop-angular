import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {ProductInterface} from "../shared/types/product.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductResponseInterface} from "../shared/types/product-response.interface";
import {Router} from "@angular/router";
import {OrderInterface} from "../shared/types/order.interface";
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{

  cartProducts: ProductInterface[] = []
  totalPrice = 0
  form!: FormGroup
  submitted = false
  added = ''

  constructor(private productService: ProductService,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++){
      this.totalPrice += +this.cartProducts[i].price
    }
    this.initialForm()
  }

  initialForm() {
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required]),
      address: new FormControl(null,[Validators.required]),
      payment: new FormControl('cash',[Validators.required]),
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true

    const order: OrderInterface = {
      ...this.form.value,
      price: this.totalPrice,
      date: new Date(),
      orders: this.cartProducts
    }

    this.orderService.create(order).subscribe((res: OrderInterface) => {
      this.form.reset()
      this.added = 'Delivery is framed'
      this.submitted = false
    })

  }

  deleteProduct(product: ProductInterface){
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }
}
