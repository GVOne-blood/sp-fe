import { Component, ChangeDetectionStrategy, signal, ElementRef, viewChild, effect } from '@angular/core';

interface ProductCategory {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-category-carousel',
  imports: [],
  templateUrl: './product-category-carousel.component.html',
  styleUrl: './product-category-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryCarouselComponent {
  carouselRef = viewChild.required<ElementRef<HTMLElement>>('carousel');
  showPrev = signal(false);
  showNext = signal(true);

  categories = signal<ProductCategory[]>([
    { name: 'iPhone', imageUrl: 'http://localhost:9000/prod-images/categories/c253d915-12fd-4cf9-8705-f84129304422.png' },
    { name: 'iPad', imageUrl: 'http://localhost:9000/prod-images/categories/c253d915-12fd-4cf9-8705-f84129304422.png' },
    { name: 'Apple Watch', imageUrl: 'http://localhost:9000/prod-images/categories/c253d915-12fd-4cf9-8705-f84129304422.png' },
    { name: 'Apple Vision Pro', imageUrl: 'http://localhost:9000/prod-images/categories/c253d915-12fd-4cf9-8705-f84129304422.png' },
    { name: 'AirPods', imageUrl: 'http://localhost:9000/prod-images/categories/m037t0008_a_food_4june2023.png' },
    { name: 'AirTag', imageUrl: 'http://localhost:9000/prod-images/categories/m037t0008_a_food_4june2023.png' },
    { name: 'Apple TV 4K', imageUrl: 'http://localhost:9000/categories/apple-tv-4k.png' },
    { name: 'HomePod', imageUrl: 'http://localhost:9000/categories/homepod.png' },
    { name: 'Accessories', imageUrl: 'http://localhost:9000/categories/accessories.png' },
    { name: 'Apple Gift Card', imageUrl: 'http://localhost:9000/categories/gift-card.png' }
  ]);

  constructor() {
    effect(() => {
        const el = this.carouselRef()?.nativeElement;
        if(el) {
            el.addEventListener('scroll', this.updateButtonVisibility.bind(this));
            this.updateButtonVisibility();
        }
    });
  }

  scroll(direction: 'left' | 'right'): void {
    const el = this.carouselRef().nativeElement;
    const scrollAmount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  updateButtonVisibility(): void {
    const el = this.carouselRef().nativeElement;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    this.showPrev.set(scrollLeft > 0);
    this.showNext.set(scrollLeft < scrollWidth - clientWidth - 1);
  }
}
