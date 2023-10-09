import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductInterface} from "../types/product.interface";
import {map, Observable} from "rxjs";
import {environment} from "../../../environment/environment";
import {ProductResponseInterface} from "../types/product-response.interface";
import {FbCreateResponse} from "../types/fb-create-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = 'phone'
  cartProducts: ProductInterface[] = []

  constructor( private http: HttpClient) { }

  create(product: ProductInterface): Observable<ProductInterface>{
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map( (res: FbCreateResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll() : Observable<ProductInterface[]>{
    return this.http.get<ProductInterface[]>(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map((res: { [key: string]: any }) => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
    })
      )
  }

  getById(id: string) : Observable<ProductInterface>{
    return this.http.get<ProductInterface>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(
        map((res: ProductInterface) => {
          return {
            ...res,
            id,
            date: new Date(res.date)
          }
        })
      )
  }

  remove(id: string) : Observable<void>{
    return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: ProductInterface) : Observable<ProductInterface>{
    return this.http.patch<ProductInterface>(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type: string){
    this.type = type
  }

  addProduct(product: ProductInterface){
    this.cartProducts.push(product)
  }

}
