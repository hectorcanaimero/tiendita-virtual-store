import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})

export class CategoryProductsComponent implements OnInit {

  id: string = '';
  products$: any = [];
  storeStorage: any = { };

  constructor(
    private util: UtilsService,
    private data$: DataService,
    private active: ActivatedRoute,
    private alertCtrl: AlertController,
  ) { }
    
  ngOnInit() {
    this.storeStorage = JSON.parse(localStorage.getItem('store'));
    const slug = this.active.paramMap.pipe(map(paramsMap => paramsMap.get('slug')));
    slug.subscribe( res => this.id = res);
    this.onProducts(this.id);
  }

  onProducts = (id: string) => {
    let data: any = [];
    const items = this.data$.getProductCategory(this.storeStorage.slug, id).pipe(
      map(actions => {
        console.log(actions);
        // return actions.map(a => {
        //   data = a.payload.doc.data();
        //   data.id = a.payload.doc.id;
        //   return data;
        // });
      })
    );
    items.subscribe(res => this.products$ = res);
  }

  onProductActive = (item: any, status: boolean) => {
    item.active = status;
    this.data$.updateProduct(this.storeStorage.slug, item.id, item);
    if (status) this.util.setToast(`${item.name} fue habilitado.`);
    else this.util.setToast(`${item.name} fue desabilitado.`);
  }

  onDeleteProduct = async (item: any) => {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: 'Quieres eliminar este <strong>producto</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            this.data$.removeProduct(this.storeStorage.slug, item.id)
            .then(() => this.onProducts(this.id));
          }
        }
      ]
    })
    return await alert.present();
  }
}
