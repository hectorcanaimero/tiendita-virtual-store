import { PushService } from './../../shared/services/push.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  formLogin: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private push$: PushService,
    private data$: DataService,
    private auth$: AuthService,
    private alertCtrl: AlertController,
    private util: UtilsService,
  ) {
  }

  ngOnInit() {
    this.onLoad();
  }

  onSubmit = () => {
    if (this.formLogin.invalid) return;
    const item = this.formLogin.value;
    this.auth$.signIn(item.email, item.password).then(
      data => {
        localStorage.setItem('user', data.user.uid);
        this.data$.existsWithStore('uid', data.user.uid).pipe(map((res)=>res[0])).subscribe((res) => {
          this.push$.requestPermission().subscribe(token => res['token'] = token);
          localStorage.setItem('store', JSON.stringify(res));
          this.data$.updateStore(res['slug'], res).then(res => res);
          this.router.navigate(['pages', 'home']);
        });
      }
    )
  }

  onForgot = async() => {
    const alert = await this.alertCtrl.create({
      header: 'Olvide mi contraseña :(',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'digite su email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Ok',
          handler: (res) => {
            this.auth$.forgotPassword(res.email)
            .then(() => this.util.setMessage(`Se envio las instrucciones a ${res.email}`))
            .catch((err) => this.util.setMessage(`${err}`))
          }
        }
      ]
    })
    return await alert.present();
  } 


  onLoad = () => {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}
