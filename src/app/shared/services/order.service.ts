import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductInterface} from "../types/product.interface";
import {map, Observable} from "rxjs";
import {environment} from "../../../environment/environment";
import {FbCreateResponse} from "../types/fb-create-response.interface";
import {OrderInterface} from "../types/order.interface";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: OrderInterface): Observable<OrderInterface>{
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map( (res: FbCreateResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll() : Observable<OrderInterface[]>{
    return this.http.get<OrderInterface[]>(`${environment.fbDbUrl}/orders.json`)
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



  remove(id: string) : Observable<void>{
    return this.http.delete<void>(`${environment.fbDbUrl}/orders/${id}.json`)
  }

}
