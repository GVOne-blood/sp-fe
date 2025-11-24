import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Category {
  id: number;
  name: string;
  count: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sold: number;
  likes: number;
  isSoldOut: boolean;
  categoryId: number;
  description?: string; // e.g. "Topping: Trân châu trắng"
}

interface CartItem {
  product: Product;
  quantity: number;
  note?: string; // For "Đá/Nóng: Đá" etc.
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
    name: 'The Coffee Factory - Trương Định',
    address: '107A Trương Định, Phường Võ Thị Sáu, Quận 3, Hồ Chí Minh',
    rating: 5,
    reviewCount: '102',
    openTime: '07:00 - 22:00',
    distance: '1357.7 km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80'
  };

  // Categories
  categories = signal<Category[]>([
    { id: 1, name: 'CÀ PHÊ VIỆT', count: 6 },
    { id: 2, name: 'CÀ PHÊ Ý', count: 3 },
    { id: 3, name: 'TRÀ/TRÀ SỮA', count: 17 },
    { id: 4, name: 'NƯỚC ÉP/MÓN KHÁC', count: 7 },
    { id: 5, name: 'SODA', count: 2 },
    { id: 6, name: 'TCF KEM MUỐI', count: 6 },
    { id: 7, name: 'TCF CAKE', count: 14 },
    { id: 8, name: 'ĐÁ XAY', count: 8 }
  ]);

  // Mock Products
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Bạc Xỉu',
      price: 39000,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80',
      sold: 1200,
      likes: 500,
      isSoldOut: false,
      categoryId: 1,
      description: 'ĐÁ/NÓNG: ĐÁ'
    },
    {
      id: 2,
      name: 'Cà Phê Sữa Đá',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=200&q=80',
      sold: 850,
      likes: 300,
      isSoldOut: false,
      categoryId: 1
    },
    {
      id: 3,
      name: 'Trà Sen Kem Muối',
      price: 56000,
      image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=200&q=80',
      sold: 200,
      likes: 150,
      isSoldOut: false,
      categoryId: 6,
      description: 'TOPPING: TRÂN CHÂU TRẮNG'
    },
    {
      id: 4,
      name: 'Soda Việt Quất',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=200&q=80',
      sold: 50,
      likes: 20,
      isSoldOut: false,
      categoryId: 5
    }
  ]);

  // Grouped products
  groupedProducts = computed(() => {
    const prods = this.products();
    const cats = this.categories();
    return cats.map(cat => ({
      ...cat,
      products: prods.filter(p => p.categoryId === cat.id)
    })).filter(group => group.products.length > 0);
  });

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
        return [...currentCart, { product, quantity: 1, note: product.description }];
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

  toggleLike(product: Product) {
    // Just a visual toggle for mock
    console.log('Liked', product.name);
  }
}
