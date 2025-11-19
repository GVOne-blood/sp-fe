import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductCategoryCarouselComponent } from './components/product-category-carousel/product-category-carousel.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ColorRibbonComponent } from './components/color-ribbon/color-ribbon.component';
import { TrendingCategoriesComponent } from './components/trending-categories/trending-categories.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    ProductCategoryCarouselComponent,
    FeaturedProductsComponent,
    ColorRibbonComponent,
    TrendingCategoriesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'springfood';
}
