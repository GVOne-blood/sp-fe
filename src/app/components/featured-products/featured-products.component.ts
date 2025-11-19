import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProductCardComponent, FeaturedProduct } from '../product-card/product-card.component';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProductsComponent {
  products = signal<FeaturedProduct[]>([
    {
      title: 'iPhone 17 Pro',
      subtitle: 'Apple Intelligence^',
      description: 'From $1099 or $45.79/mo. for 24 mo.*',
      imageUrl: 'https://www.apple.com/v/iphone/home/bu/images/overview/compare/compare_iphone_15_pro__f2nmdrye63ue_large.jpg',
      bgClass: 'bg-gradient-to-br from-yellow-50 to-orange-100',
      textColor: 'text-black',
      titleSize: 'text-5xl',
      textAlign: 'text-center'
    },
    {
      title: 'MacBook Pro 14" with M5',
      subtitle: 'Apple Intelligence^',
      description: 'From $1599 or $133.25/mo. for 12 mo.†',
      imageUrl: 'https://www.apple.com/v/macbook-pro/am/images/overview/read-the-tech-specs/macbook_pro_14_and_16_silver_and_space_black__c6z3ns9z3m6e_large.jpg',
      bgClass: 'bg-gradient-to-br from-gray-800 to-black',
      textColor: 'text-white',
      titleSize: 'text-5xl',
      textAlign: 'text-center'
    },
    {
      title: 'iPad Pro',
      subtitle: 'Apple Intelligence^',
      description: 'From $999 or $83.25/mo. for 12 mo.‡',
      imageUrl: 'https://www.apple.com/v/ipad-pro/am/images/overview/chip/chip_m4_pro__c2ptrem9ia4i_large.jpg',
      bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      textColor: 'text-black',
      titleSize: 'text-5xl',
      textAlign: 'text-center'
    },
  ]);
}
