import { Component, OnInit } from '@angular/core';
import { OneSignalService } from 'ngx-onesignal';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private readonly tagsSubscribe$ = new BehaviorSubject<{
    [key: string]: string;
  }>({});
  public readonly tags$ = this.tagsSubscribe$.asObservable();

  constructor(
    private data$: DataService,
    public readonly onesignal: OneSignalService
  ) { (window as any).ngxOnesignal = this.onesignal; }


  ngOnInit() {
    this.count = this.data$.getCustomers(this.store.slug).pipe(map((res) => res.length));
  }

  onSubscribe() {
    this.onesignal.subscribe();
  }

  onUnSubscribe() {
    this.onesignal.unsubscribe();
  }

  testPush() {
    this.onesignal.push([
      'sendTag',
      'random',
      Math.random(),
      tagsSent => {
        console.log('tagsSent', tagsSent);
      },
    ]);
  }

  getTags() {
    this.onesignal.push([
      'getTags',
      tags => {
        this.tagsSubscribe$.next(tags);
      },
    ]);
  }


}