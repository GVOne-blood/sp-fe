import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface FeaturedProduct {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  bgClass: string;
  textColor: string;
  titleSize: string;
  textAlign: string;
}

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<FeaturedProduct>();
}
