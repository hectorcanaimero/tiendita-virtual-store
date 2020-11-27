import { PushService } from './../../shared/services/push.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  count: Observable<number>;
  store: any = JSON.parse(localStorage.getItem('store'));

  message: any = [];

  constructor(
    private push$: PushService,
    private data$: DataService,
  ) { }


  ngOnInit() {
    this.count = this.data$.getCustomers(this.store.slug).pipe(map((res) => res.length));
    this.push$.requestPermission().subscribe((res) => console.log(res));
    this.push$.receiveMessage();
    this.message = this.push$.currentMessage;
    console.log(this.push$.currentMessage);
  }
}