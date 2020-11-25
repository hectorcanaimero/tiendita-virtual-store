import { HistoryComponent } from './history/history.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CustomerPage } from './customer.page';
import { DetailComponent } from './detail/detail.component';
import { CustomerPageRoutingModule } from './customer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage, DetailComponent, HistoryComponent]
})
export class CustomerPageModule {}
