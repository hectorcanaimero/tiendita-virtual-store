import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';


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
    private db: DataService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onSubmit = () => {
    if (this.formLogin.invalid) return;
    const item = this.formLogin.value;
    this.auth.signIn(item.email, item.password).then(
      data => {
        localStorage.setItem('user', data.user.uid);
        this.db.existsWithStore('uid', data.user.uid).pipe(map((res)=>res[0])).subscribe((res) => {
          localStorage.setItem('store', JSON.stringify(res));
          this.router.navigate(['pages', 'home']);
        });
      }
    )
  }
  onForgot = (email: string) => {
    this.auth.forgotPassword(email).then(() => {
      console.log('Enviado');
    })
  }

  onLoad = () => {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}
