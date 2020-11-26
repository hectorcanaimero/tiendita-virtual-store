import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxOneSignalModule } from 'ngx-onesignal';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('OneSignalSDKWorker.js', { enabled: environment.production }),
    NgxOneSignalModule.forRoot({ 
      appId: '9a783d43-3500-440e-b736-58db7c724a99',
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: { enabled: true },
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
