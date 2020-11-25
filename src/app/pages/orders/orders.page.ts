import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {


  orders$: Observable<any>;
  store: any = JSON.parse(localStorage.getItem('store'));

  constructor(
    private data$: DataService
  ) { }

  ngOnInit() {
    this.onOrders();
    this.orders$.subscribe(res => console.log(res));
  }

onOrders = () => {
  this.orders$ = this.data$.getOrdersStatus(this.store.slug, 1).pipe(
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

}
