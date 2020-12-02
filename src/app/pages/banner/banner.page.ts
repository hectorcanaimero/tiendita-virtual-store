import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup, ModalController, ActionSheetController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from 'src/app/shared/services/data.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  text: string = 'ordernar';
  store: any = JSON.parse(localStorage.getItem('store'));
  items$: any = [];
  active: boolean = true;

  constructor(
    private util: UtilsService,
    private data$: DataService,
    private modalCtrl: ModalController,
    private actionCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.onCarousels();
  }

  add = async () => {
    const modal = await this.modalCtrl.create({
      component: AddComponent
    });
    modal.present();
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const itemMove = this.items$.splice(ev.detail.from, 1)[0];
    this.items$.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
  }


  order = () => {
    timer(100).subscribe(() => {
      this.text = 'actualizar';
      this.active = false;
    })
  }

  orderSave = () => {
    timer(100).subscribe(() => {
      this.text = 'ordenar';
      this.active = true;
      this._updateCarouselOrders(this.items$);
      this.onCarousels();
    })
  }

  _updateCarouselOrders = (item: any) => {
    for (let i = 0; i < item.length; i++) {
      item[i].order = i;
      this.data$.updateCarousel(this.store.slug, item[i].id, item[i]).then((res) => res);
    }
  }  

  onRefresh = (e: any) => timer(1000).subscribe(() => {
    this.onCarousels();
    e.target.complete();
  });

  onCarousels = () => {
    this.data$.getCarousels(this.store.slug).pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    ).subscribe(res => {this.items$ = res;});
  }

  onAction = async (item: any) => {
    const actionSheet = await this.actionCtrl.create({
      mode: 'ios',
      buttons: [
      { text: 'Ver', handler: () => this._onView(item) }, 
      { text: 'Editar', handler: () => this._onEdit(item) }, 
      {
        text: 'Eliminar',
        handler: () => {
          item.status = { id: 4, name: 'trash' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => this.util.setToast(`Pédido: ${ item.id } fue cancelado`));
        }
      }
    ]
    });
    await actionSheet.present();
  };
  _onView = async (item: any) => {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { item }
    });
    return await modal.present();
  }

  _onEdit = async (item: any) => {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
      componentProps: { item }
    });
    modal.present();
  }

  onDelete = (item: any) => console.log('On Delete ', item);

}
