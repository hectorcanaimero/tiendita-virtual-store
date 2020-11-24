import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { CategoryProductsComponent } from './category-products/category-products.component';

const routes: Routes = [
  { path: '', component: ProductsPage },
  { path: 'category/:slug', component: CategoryProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
