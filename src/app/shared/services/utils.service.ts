import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
 
@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
  ) { }


  setToast = async (message: string) => {
    const toast = await this.toastCtrl.create({ message, duration: 1500 });
    toast.present();
  }

  buildSlug = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'); 
    return str;
  }

  uploadImage = (data: any): Observable<any> => this.http.post(environment.cloudinary.url, data );
}
