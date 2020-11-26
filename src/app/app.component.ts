import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { OneSignalService } from 'ngx-onesignal';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public readonly onesignal: OneSignalService,
  ) {
    (window as any).ngxOnesignal = this.onesignal;
    this.initializeApp();
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.onesignal.subscribe();
      console.log(`Initiated`);
    }, 2000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
