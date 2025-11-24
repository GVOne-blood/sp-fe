import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sold: number;
  likes: number;
  isSoldOut: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-store-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-detail.component.html',
  styleUrl: './store-detail.component.css'
})
export class StoreDetailComponent {
  storeId: string | null = null;

  // Mock Store Data
  storeInfo = {
    name: 'Cơm Tấm Sài Gòn - Nguyễn Trãi',
    address: '123 Nguyễn Trãi, Quận 5, TP. HCM',
    rating: 4.8,
    reviewCount: '999+',
    openTime: '07:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80' // Placeholder
  };

  // Mock Products
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Cơm Tấm Sườn Bì Chả',
      price: 45000,
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      sold: 1200,
      likes: 500,
      isSoldOut: false
    },
    {
      id: 2,
      name: 'Cơm Tấm Sườn Cây',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      sold: 850,
      likes: 300,
      isSoldOut: false
    },
    {
      id: 3,
      name: 'Cơm Tấm Gà Nướng (Hết)',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      sold: 2000,
      likes: 800,
      isSoldOut: true
    },
    {
      id: 4,
      name: 'Bún Thịt Nướng',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      sold: 150,
      likes: 50,
      isSoldOut: false
    },
    {
      id: 5,
      name: 'Bì Cuốn',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
      sold: 5000,
      likes: 1200,
      isSoldOut: true
    }
  ]);

  // Cart Logic
  cart = signal<CartItem[]>([]);

  cartTotal = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  });

  cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  constructor(private route: ActivatedRoute) {
    this.storeId = this.route.snapshot.paramMap.get('id');
  }

  addToCart(product: Product) {
    if (product.isSoldOut) return;

    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: number) {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return currentCart.filter(item => item.product.id !== productId);
      }
    });
  }
}
