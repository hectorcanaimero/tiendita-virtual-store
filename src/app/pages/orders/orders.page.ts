import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { DetailComponent } from './detail/detail.component';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  type: string = ''; 
  ordersPaid$: Observable<any>;
  ordersTrash$: Observable<any>;
  ordersProccess$: Observable<any>;
  ordersDelivery$: Observable<any>;
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private util: UtilsService,
    private data$: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actionSheet: ActionSheetController,
  ) { }

  ngOnInit() {
    this.onOrders();
  }

  onOrders = () => {
    this.onPaid();
    this.onProccess();
    this.onDelivery();
    this.onTrashView();
  }

  onProccess = () => {
    this.ordersProccess$ = this.data$.getOrdersStatus(this.store.slug, 1).pipe(
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

  onDelivery = () => {
    this.ordersDelivery$ = this.data$.getOrdersStatus(this.store.slug, 2).pipe(
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

  onPaid = () => {
    this.ordersPaid$ = this.data$.getOrdersStatus(this.store.slug, 3).pipe(
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

  onTrashView = () => {
    this.ordersTrash$ = this.data$.getOrdersStatus(this.store.slug, 4).pipe(
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

  onView = async (item: any) => {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { item }
    });
    modal.present();
  }

  onTrash = async (item: any) => {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Confirmar!',
      message: 'Seguro, deseas eliminar este pédido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            item.status = { id: 4, name: 'trash' };
            this.data$.updateOrders(this.store.slug, item.id, item)
            .then(() => this.util.setToast(`Su pédido: ${ item.id } fue eliminado`));
          }
        }
      ]
    });
    alert.present();
  }
  
  onStatus = async (item: any) => {
    const actionSheet = await this.actionSheet.create({
      mode: 'ios',
      buttons: [
      {
        text: 'Em Proceso',
        handler: () => {
          item.status = { id: 1, name: 'proccess' };
          this.data$.updateOrders(this.store.slug, item.id, item)
          .then(() => this.util.setToast(`Pédido: ${ item.id } esta siendo procesado`));
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

  onSegment = (e: any) => this.type = e.detail.value;
  onRefresh = (e: any) => {
    timer(1000).subscribe(() => {
      this.onOrders();
      e.target.complete();
    });
  }

}
