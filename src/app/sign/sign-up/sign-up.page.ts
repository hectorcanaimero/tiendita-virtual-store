import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  token: string = '';
  formNewStore: FormGroup;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private util: UtilsService,
    private afMessaging: AngularFireMessaging,
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onSubmit = () => {
    this.afMessaging.requestToken.subscribe((token) =>  this.token = token);
    let count = 0;
    if (this.formNewStore.invalid) return;
    const item = this.formNewStore.value;
    this.data.existsWithStore('slug', item.slug).subscribe((res) => {
      if (res.length === 0) {
        this.auth.signUp(item.email, item.password)
        .then(data => {
          const add = {
            uid: data.user.uid,
            name: item.name,
            slug: item.slug,
            email: item.email,
            token: this.token
          }
          this.data.addStore(add).then((res) => res);
          localStorage.setItem('user', data.user.uid);
          localStorage.setItem('store', JSON.stringify(add));
          this.router.navigate(['pages', 'home']);
        })
      } else {
        console.log('Registrado');
      }
    })
  }

  onSlug = (e: any) => {
    const value = e.detail.value;
    if (value.length < 4) return;
    this.formNewStore.controls.slug.setValue(this.util.buildSlug(value));
  }

  onLoad = () => {
    this.formNewStore = this.fb.group({
      uid: [''],
      name: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onForgot = () => console.log('Arrebatao');
}
