import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StoreDetailComponent } from './pages/store-detail/store-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store/:id', component: StoreDetailComponent }
];
