import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPage } from './products.page';
import { ProductsPageRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CategoryProductsComponent } from './category-products/category-products.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ProductsPageRoutingModule,
  ],
  declarations: [ProductsPage, AddProductComponent, DetailProductComponent, CategoryProductsComponent],
  entryComponents: [AddProductComponent, DetailProductComponent, CategoryProductsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsPageModule {}
