import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;

import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  items$: Observable<any>; 
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private data$: DataService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.onGetCustomers();
    this.items$.subscribe(res => console.log(res));
  }

  onGetCustomers = () => {
    this.items$ = this.data$.getCustomers(this.store.slug).pipe(
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

  onRefresh = (e: any) => timer(1000).subscribe(() => {
    this.onGetCustomers();
    e.target.complete();
  });

  onSearch = (e: any) => console.log(e.detail.value);
  
  onView = (id: string) => this.navCtrl.navigateForward(`pages/customer/detail/${id}`);

  onClickWhats = async (item: any) => await Browser.open({
    windowName: '_system', 
    url: `https://api.whatsapp.com/send?phone=${item.phone}&text=Hola%20${item.name}%20estamos%20entrando%20en%20contacto%20de %20${this.store.name}.`
  });
  
  onClickPhone = async (phone: string) => await Browser.open({ url: `tel: ${phone}` });

}
