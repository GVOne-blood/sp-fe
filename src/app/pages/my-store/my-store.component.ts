import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-store',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-store.component.html',
  styleUrl: './my-store.component.css'
})
export class MyStoreComponent {
  userService = inject(UserService);
  user = this.userService.currentUser;

  // Toggle store status for demo purposes
  createStore() {
    this.userService.toggleStoreStatus();
  }
}
