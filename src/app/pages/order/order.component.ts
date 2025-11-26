import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, OrderDetails } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  public orderDetails$: Observable<OrderDetails> | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.orderDetails$ = this.cartService.getOrderDetails();
  }
}
