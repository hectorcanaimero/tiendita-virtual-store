import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  signIn = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);
  signUp = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);
  signOut = () => this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign', 'sign-in']);
    })

  forgotPassword = (email: string) => this.auth.sendPasswordResetEmail(email);
}
