import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerPage } from './banner.page';
import { AddComponent } from './add/add.component';
import { BannerPageRoutingModule } from './banner-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    BannerPageRoutingModule
  ],
  declarations: [BannerPage, AddComponent]
})
export class BannerPageModule {}
