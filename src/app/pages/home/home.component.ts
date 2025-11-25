import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProductCategoryCarouselComponent } from '../../components/product-category-carousel/product-category-carousel.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { TrendingCategoriesComponent } from '../../components/trending-categories/trending-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ProductCategoryCarouselComponent,
    FeaturedProductsComponent,
    TrendingCategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
