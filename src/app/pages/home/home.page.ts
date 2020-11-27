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

  constructor(
    private data$: DataService,
  ) { }


  ngOnInit() {
    this.count = this.data$.getCustomers(this.store.slug).pipe(map((res) => res.length));
  }
}