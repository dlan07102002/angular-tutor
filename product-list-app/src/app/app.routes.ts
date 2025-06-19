import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
// File chứa đường dẫn
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detail/:id',
    // component: DetailComponent,
    loadComponent: () =>
      import('./detail/detail.component').then((m) => m.DetailComponent),
  },
];
