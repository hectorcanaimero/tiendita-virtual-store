import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  add = async () => {
    const modal = await this.modalCtrl.create({
      component: AddComponent
    });
    modal.present();
  }

}
