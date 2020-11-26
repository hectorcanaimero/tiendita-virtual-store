import { UtilsService } from './../../../shared/services/utils.service';
import { Component, Input, OnInit } from '@angular/core';

import { ModalController, ActionSheetController } from '@ionic/angular';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from './../../../shared/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() item: any = [];
  products$: Observable<any>;
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private util: UtilsService,
    private data$: DataService,
    private modalCtrl: ModalController,
    private actionSheet: ActionSheetController,
  ) { }

  ngOnInit() {
    timer(300).subscribe(() => {
      console.log(this.item);
      this.onProducts(this.item.id);
    })
  }

  onProducts = (order: string) => {
    this.products$ = this.data$.getOrdersProduct(this.store.slug, order).pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    )
  }

  onStatus = async (item: any) => {
    console.log(item);
    const actionSheet = await this.actionSheet.create({
      mode: 'ios',
      buttons: [
      {
        text: 'Em Proceso',
        handler: () => {
          item.status = { id: 1, name: 'proccess' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => {
            this.util.setToast(`Pédido: ${ item.id } esta siendo procesado`);
            this.actionSheet.dismiss();
          });
        }
      }, {
        text: 'Despachado',
        handler: () => {
          item.status = { id: 2, name: 'delivery' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => this.util.setToast(`Pédido: ${ item.id } fue despachado`));
        }
      }, {
        text: 'Entregado',
        handler: () => {
          item.status = { id: 3, name: 'paid' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => this.util.setToast(`Pédido: ${ item.id } fue entregado`));
        }
      }, {
        text: 'Cancelado',
        handler: () => {
          item.status = { id: 4, name: 'trash' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => this.util.setToast(`Pédido: ${ item.id } fue cancelado`));
        }
      }
    ]
    });
    await actionSheet.present();
  }


  onClose = () => this.modalCtrl.dismiss();

}
