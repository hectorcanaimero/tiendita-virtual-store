import { HistoryComponent } from './../history/history.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from './../../../shared/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  id: any = [];
  item$: Observable<any>;
  orders$: Observable<any>;
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private data$: DataService,
    private active: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const slug: Observable<string> = this.active.paramMap.pipe(map(paramsMap => paramsMap.get('id')));
    slug.subscribe((res) => this.id = res);
    this.onCustomer();
    this.onOrderscustomer();  
  }

  onCustomer = () => this.item$ = this.data$.getCustomerId(this.store.slug, this.id);

  onOrderscustomer = () => {
    this.orders$ = this.data$.getOrdersCustomer(this.store.slug, this.id).pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    );
  }

  goToHistory = async (item: any) => {
    const modal = await this.modalCtrl.create({
      component: HistoryComponent,
      componentProps: { item }
    });
    modal.present();
  }

}
