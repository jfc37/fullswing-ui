import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginContainer } from './containers/login/login.container';
import { routes } from './login.routes';

console.log('`Login` bundle loaded asynchronously');

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginContainer,
  ]
})
export class LoginModule { }
