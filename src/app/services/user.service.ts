import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  phoneNumber: string;
  avatarUrl: string;
  joinDate: string;
  hasStore: boolean;
  address?: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mock user data
  private mockUser: User = {
    id: '1',
    firstName: 'An',
    lastName: 'Nguyen',
    username: 'annv',
    email: 'an.nguyen@example.com',
    gender: 'Male',
    phoneNumber: '+84 123 456 789',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgjZ9GwA2m2p3P5NE403dzCnqP20TuT0CYAJQgc_pm1OBq76QsQZRldqxKzi3908A36n-cMI1DQ4R_oBcfc6AdyZwLIGrIiA_WBe-rCgD-cHEG4cbCZUxGt7d4lrvrcs8qtLcrlYLMg0niB-fA7AhvrJ4CbOZ8Ny31XyejpmLXDpGsIzHOXpYuBjdNOIe_SUniWX_VYeP0wF1dYE6xL6kuFAxFpTSmxcOAkL2kdGiv-dV-oWWp4pyVhcNiy0Ledtbl6U-Wr4JOF2MB',
    joinDate: '2023',
    hasStore: false, // Default to false to test the "Open Store" view first
    address: {
      street: '123 Đường ABC',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh'
    }
  };

  currentUser = signal<User | null>(this.mockUser);

  constructor() { }

  updateUser(user: Partial<User>) {
    this.currentUser.update(current => current ? { ...current, ...user } : null);
  }

  toggleStoreStatus() {
    this.currentUser.update(user => user ? { ...user, hasStore: !user.hasStore } : null);
  }
}
