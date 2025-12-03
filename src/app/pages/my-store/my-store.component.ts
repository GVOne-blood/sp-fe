import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { ProfileSidebarComponent } from '../../components/profile-sidebar/profile-sidebar.component';

@Component({
  selector: 'app-my-store',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileSidebarComponent],
  templateUrl: './my-store.component.html',
  styleUrl: './my-store.component.css'
})
export class MyStoreComponent {
  userService = inject(UserService);
  user = this.userService.currentUser;

  createStore() {
    this.userService.toggleStoreStatus();
  }
}
