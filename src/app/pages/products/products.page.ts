import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  type: string = ''; 
  categories$: any = [];
  products$: any = [];
  storeStorage: any = {};
  formCategory: FormGroup;
  countProduct: any = [];

  productsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private util: UtilsService,
    private data$: DataService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.storeStorage = JSON.parse(localStorage.getItem('store'));
    this.onLoadCategory();
    this.onCategories();
    this.onProducts();
  }

  ngOnDestroy () {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  onSegment = (e: any) => this.type = e.detail.value;
  onRefresh = (e: any) => timer(1000).subscribe(() => {
      this.onCategories();
      this.onProducts();
      e.target.complete();
    });

  onCategories = () => {
    let data: any = [];
    this.data$.getCategories(this.storeStorage.slug).pipe(
      map(actions => {
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    ).subscribe(res => this.categories$ = res);
  }
  onAddCategory = async() => {
    const alert = await this.alertCtrl.create({
      header: 'Agregar!',
      message: 'Crear las categorias de tu tinda',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la Categoria'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Ok',
          handler: (res) => {
            this.data$.addCategory(this.storeStorage.slug, res)
            .then(() => this.onCategories());
          }
        }
      ]
    })
    return await alert.present();
  }

  onDeleteCategory = async (id: string) => {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar!',
      message: 'Quieres eliminar esta <strong>categoria</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Eliminar',
          handler: () => {
            this.data$.removeCategory(this.storeStorage.slug, id)
            .then(() => this.onCategories());
          }
        }
      ]
    })
    return await alert.present();
  };
  
  onCategoryProducts = (id: string) => this.navCtrl.navigateForward(`pages/products/category/${id}`);
  // Products
  onProducts = () => {
    let data: any = [];
    const items = this.data$.getProducts(this.storeStorage.slug).pipe(
      map(actions => {
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    );
    this.productsSubscription = items.subscribe(res => this.products$ = res);
  }
  
  onView = async(item: any) => {
    const modal = await this.modalCtrl.create({
      component: DetailProductComponent,
      componentProps: { item }
    });
    return await modal.present();
  }
  
  onProductActive = (item: any, status: boolean) => {
    item.active = status;
    this.data$.updateProduct(this.storeStorage.slug, item.id, item);
    if (status) this.util.setToast(`${item.name} fue habilitado.`);
    else this.util.setToast(`${item.name} fue desabilitado.`);
  }

  onAddProduct = async (item?: any) => {
    const modal = await this.modalCtrl.create({
      component: AddProductComponent,
      componentProps: { item }
    });
    return await modal.present();
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
            .then(() => this.onProducts());
          }
        }
      ]
    })
    return await alert.present();
  }

  onLoadCategory = () => {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
}
