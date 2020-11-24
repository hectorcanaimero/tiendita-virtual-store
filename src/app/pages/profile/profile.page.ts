import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  store: any = JSON.parse(localStorage.getItem('store'));

  constructor() { }

  ngOnInit() {
  }

}
