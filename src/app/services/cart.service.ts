import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  options: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderDetails {
  storeName: string;
  deliveryAddress: string;
  notes: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private mockOrder: OrderDetails = {
    storeName: 'Mỳ Cay Jeju - Tu Hoàng',
    deliveryAddress: 'Trung Tâm Pha Sơn Vi Tinh Quang Chinh, Quốc Lộ 32, P.Minh Khai, Q.Bắc Từ Liêm, Hà Nội',
    notes: 'Vd: Bác tài vui lòng gọi trước khi đến giao',
    items: [
      {
        id: 1,
        name: 'Mỳ kim chi hải sản',
        options: 'Cấp độ cay: Cấp 0',
        price: 68000,
        quantity: 1,
        imageUrl: 'https://i.imgur.com/rs23gCq.png'
      }
    ],
    subtotal: 68000,
    deliveryFee: 20000,
    discount: -25000,
    total: 63000
  };

  constructor() { }

  getOrderDetails(): Observable<OrderDetails> {
    return of(this.mockOrder);
  }
}
