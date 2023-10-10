import {ProductInterface} from "./product.interface";

export interface OrderInterface{
  address: string
  date: Date
  name: string
  payment: string
  phone: string
  price: number
  orders: ProductInterface[]
  id? : string
}
