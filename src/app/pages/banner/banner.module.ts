import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerPage } from './banner.page';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { BannerPageRoutingModule } from './banner-routing.module';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BannerPageRoutingModule
  ],
  declarations: [BannerPage, AddComponent, DetailComponent]
})
export class BannerPageModule {}
