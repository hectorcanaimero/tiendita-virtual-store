import { AuthService } from './../../shared/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onLink = (url: string) => this.navCtrl.navigateForward(url);
  logout = () => this.auth.signOut();
}
