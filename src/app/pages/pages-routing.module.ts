import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'banners',
        loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'push',
        loadChildren: () => import('./push/push.module').then( m => m.PushPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
