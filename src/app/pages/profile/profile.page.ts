import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  
  store: any = JSON.parse(localStorage.getItem('store'));
  active: boolean = this.store.active;

  constructor(
    private auth: AuthService,
    private data$: DataService,
  ) { }

  ngOnInit() {
  }

  toogle = (e: any)  => {
    this.store.active = e.detail.checked;
    this.data$.activeStore(this.store).then(() => localStorage.setItem('store', JSON.stringify(this.store)));
  }

  logout = () => this.auth.signOut();

}
