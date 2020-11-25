import { DataService } from 'src/app/shared/services/data.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  @Input() item: any = [];
  products$: Observable<any>;
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private data$: DataService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.products$ = this.data$.getOrdersCustomerProduct(this.store.slug, this.item.customer.uid, this.item.id).pipe(
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

  onClose = () => this.modalCtrl.dismiss();

}
