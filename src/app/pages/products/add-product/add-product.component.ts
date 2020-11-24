import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Platform, ModalController } from '@ionic/angular';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;


import { DataService } from 'src/app/shared/services/data.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  photo: SafeResourceUrl;
  isDesktop: boolean;

  @Input() item: any = [];
  formProduct: FormGroup;
  store: any = [];
  categories$: any = [];
  img:  any = [];

  constructor(
    private fb: FormBuilder,
    private data$: DataService,
    private util: UtilsService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.store = JSON.parse(localStorage.getItem('store'));
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
    this.onLoad();
    timer(300).subscribe(() => {
      console.log(this.item);
      if (this.item) {
        this.formProduct.patchValue({
          name: this.item.name,
          description: this.item.description,
          price: this.item.price,
          image: this.item.image,
          active: this.item.active,
          category: this.item.category
        })
      }
    });
    this._onCategories();
  }

  onSave = () => {
    if (this.formProduct.invalid) return;
    if (this.item) this._updateProduct();
    else this._addProduct();
    this.onClose();
  }


  _updateProduct = () => {
    this.data$.updateProduct(this.store.slug, this.item.id,this.formProduct.value)
    .then(() => this.util.setToast(`${ this.formProduct.value.name } fue actualizado`));
  }

  _addProduct = () => {
    this.formProduct.controls.image.setValue(this.img);
    this.data$.addProduct(this.store.slug, this.formProduct.value)
    .then(() => this.util.setToast(`${ this.formProduct.value.name } fue agregado`));
  }

  _onCategories = () => {
    this.data$.getCategories(this.store.slug).pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    ).subscribe(res => this.categories$ = res);
  }

  onLoad = () => {
    this.formProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', Validators.required],
      active: [true, Validators.required],
      image: [''],
      description: [''],
      category: ['']
    })
  }

  onClose = () => {
    this.item = [];
    this.modalCtrl.dismiss();
  }

  async getPicture(type: string) {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    const data = {
      file: image && (image.dataUrl),
      upload_preset: environment.cloudinary.preset,
      cloud_name: environment.cloudinary.cloud,
      api_key: environment.cloudinary.key

    }
    this.util.uploadImage(data).subscribe(
      (res) => this.img = { url: res.url, public_id: res.public_id },
      (err) => console.log(err)
    );
  }

  removeImage = () => {
    const ite = this.util.removeImage(this.item.image.public_id);
    ite.subscribe((res) => console.log(res));
    // this.item.image = [];
  }
}
