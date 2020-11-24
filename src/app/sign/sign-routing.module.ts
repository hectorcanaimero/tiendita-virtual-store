import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignPage } from './sign.page';

const routes: Routes = [
  {
    path: '',
    component: SignPage
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPageRoutingModule {}
