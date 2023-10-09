import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductInterface} from "../../../shared/types/product.interface";
import {ProductResponseInterface} from "../../../shared/types/product-response.interface";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{

  form!: FormGroup
  product!: ProductInterface
  submitted = false


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productService.getById(params['id'])
      })
    ).subscribe(product => {
      this.product = product
      this.form = new FormGroup({
        type: new FormControl(product.type,[Validators.required]),
        title: new FormControl(product.title,[Validators.required]),
        photo: new FormControl(product.photo,[Validators.required]),
        info: new FormControl(product.info,[Validators.required]),
        price: new FormControl(product.price,[Validators.required]),
      })
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true

    const product: ProductInterface = {
      ...this.product,
      ...this.form.value,
      date: new Date()
    }

    this.productService.update(product).subscribe((res: ProductResponseInterface) =>{
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
    })

  }
}
