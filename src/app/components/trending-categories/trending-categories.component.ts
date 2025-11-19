import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrendingCategory {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  imageUrl: string;
  rank: number;
  bgPattern: string;
}

@Component({
  selector: 'app-trending-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending-categories.component.html',
  styleUrl: './trending-categories.component.css'
})
export class TrendingCategoriesComponent {
  trendingCategories = signal<TrendingCategory[]>([
    {
      id: 1,
      name: 'Fresh Vegetables',
      subtitle: 'Organic & Healthy',
      price: 'From $2.99',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      rank: 1,
      bgPattern: 'from-yellow-100 via-orange-50 to-yellow-100'
    },
    {
      id: 2,
      name: 'Premium Meat',
      subtitle: 'Fresh Daily',
      price: 'From $12.99',
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
      rank: 2,
      bgPattern: 'from-gray-100 via-slate-50 to-gray-100'
    },
    {
      id: 3,
      name: 'Dairy Products',
      subtitle: 'Farm Fresh',
      price: 'From $4.99',
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400',
      rank: 3,
      bgPattern: 'from-amber-100 via-orange-50 to-amber-100'
    },
    {
      id: 4,
      name: 'Fresh Fruits',
      subtitle: 'Seasonal Selection',
      price: 'From $3.99',
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
      rank: 4,
      bgPattern: 'from-blue-50 via-indigo-50 to-blue-50'
    },
    {
      id: 5,
      name: 'Bakery',
      subtitle: 'Freshly Baked',
      price: 'From $5.99',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      rank: 5,
      bgPattern: 'from-rose-50 via-pink-50 to-rose-50'
    }
  ]);

  getRankBadge(rank: number): string {
    const badges = {
      1: '🥇',
      2: '🥈', 
      3: '🥉',
      4: '4️⃣',
      5: '5️⃣'
    };
    return badges[rank as keyof typeof badges] || '';
  }

  getRankColor(rank: number): string {
    const colors = {
      1: 'from-yellow-400 to-yellow-600',
      2: 'from-gray-300 to-gray-500',
      3: 'from-orange-400 to-orange-600',
      4: 'from-blue-400 to-blue-600',
      5: 'from-purple-400 to-purple-600'
    };
    return colors[rank as keyof typeof colors] || '';
  }
}
