import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductInterface} from "../../../shared/types/product.interface";
import {ProductService} from "../../../shared/services/product.service";
import {ProductResponseInterface} from "../../../shared/types/product-response.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit{

  form!: FormGroup
  submitted = false

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.initialForm()
  }

  initialForm() {
    this.form = new FormGroup({
      type: new FormControl(null,[Validators.required]),
      title: new FormControl(null,[Validators.required]),
      photo: new FormControl(null,[Validators.required]),
      info: new FormControl(null,[Validators.required]),
      price: new FormControl(null,[Validators.required]),
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true

    const product: ProductInterface = {
      ...this.form.value,
      date: new Date()
    }

    this.productService.create(product).subscribe((res: ProductResponseInterface) =>{
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/'])
    })

  }
}
