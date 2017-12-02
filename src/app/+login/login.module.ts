import { AuthoriseContainer } from './containers/authorise/authorise.container';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginContainer } from './containers/login/login.container';
import { routes } from './login.routes';
import Auth0Lock from 'auth0-lock';
import { ReplaySubject, Observable } from 'rxjs';
import { AuthSetup } from './services/auth-setup.service';
import { environment } from '../../environments/environment';

console.log('`Login` bundle loaded asynchronously', environment);

const clientId = 'jaLVtw90tXt8tCCBIHIUJLIcP2p2MMdE';
const domain = 'jfc-dev.au.auth0.com';
const lock2 = new Auth0Lock(clientId, domain, {
  auth: {
    redirectUrl: `${environment.baseUrl}/login/authorise`,
    responseType: 'token',
  }
});

lock2.on('authenticated', function (authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('access_token', authResult.accessToken);

  lock2.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginContainer,
    AuthoriseContainer,
  ],
  providers: [
    { provide: AuthSetup, useValue: new AuthSetup(lock2) },
  ]
})
export class LoginModule { }
