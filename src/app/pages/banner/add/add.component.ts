import { timer } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as moment from 'moment'; 
import * as firebase from 'firebase/app'; 
import { ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';

import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/shared/services/data.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  @Input() item: any = [];

  img:  any = [];
  formAdd: FormGroup;
  isDesktop: boolean;
  active: boolean = true;
  photo: SafeResourceUrl;
  store: any = JSON.parse(localStorage.getItem('store'));
  count: number = 0;

  constructor(
    private fb: FormBuilder,
    private data$: DataService,
    private util: UtilsService,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) this.isDesktop = true;
    this.onLoad();
    this.countCarousels();
    timer(300).subscribe(() => {
      console.log(this.item);
      if (this.item) {
        this.formAdd.patchValue({
          name: this.item.name,
          image: this.item.image,
          c_at: this.item.c_at,
          c_ed: this.item.c_ed,
          active: this.item.active,
          order: this.item.active,
        })
      }
    });
  }

  onSave = () => {
    if (this.formAdd.invalid) return;
    this._addBanner();
    // if (this.item) this._updateBanner();
    // else this._addBanner();
    this.onClose();
  }


  _updateBanner = () => {
    if (!this.item.image) this.formAdd.controls.image.setValue(this.img);
    this.data$.updateProduct(this.store.slug, this.item.id,this.formAdd.value)
    .then(() => this.util.setToast(`${ this.formAdd.value.name } fue actualizado`));
  }

  _addBanner = () => {
    this.formAdd.controls.image.setValue(this.img);
    this.formAdd.controls.active.setValue(true);
    this.formAdd.controls.order.setValue(this.count + 1);
    console.log(this.formAdd.value);
    this.data$.addCarousel(this.store.slug, this.formAdd.value)
    .then(() => this.util.setToast(`${ this.formAdd.value.name } fue agregado`))
    .catch((err) => console.log(err));
  }

  onLoad = () => {
    this.formAdd = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      start: [''],
      end: [''],
      active: [''],
      order: [''],
    })
  }


  countCarousels = () => {
    this.data$.getCarousels(this.store.slug).pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    ).subscribe(res => this.count = res.length);
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

  removeImage = () => delete this.item.image;


  toogle = (e: any) => console.log(e.detail.checked);
  onClose = () => this.modalCtrl.dismiss();
}
