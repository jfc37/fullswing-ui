import { AuthoriseContainerDispatcher } from './containers/authorise/authorise.container.dispatcher';
import { AuthoriseContainer } from './containers/authorise/authorise.container';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginContainer } from './containers/login/login.container';
import { routes } from './login.routes';
import Auth0Lock from 'auth0-lock';
import { ReplaySubject, Observable } from 'rxjs';
import { AuthSetup, AuthResult, ProfileResult } from './services/auth-setup.service';
import { environment } from '../../environments/environment';

console.log('`Login` bundle loaded asynchronously', environment);

const authResultReplay = new ReplaySubject<AuthResult>();
const profileResultReplay = new ReplaySubject<ProfileResult>();

const clientId = 'jaLVtw90tXt8tCCBIHIUJLIcP2p2MMdE';
const domain = 'jfc-dev.au.auth0.com';
const lock2 = new Auth0Lock(clientId, domain, {
  auth: {
    redirectUrl: `${environment.baseUrl}/login/authorise`,
    responseType: 'token',
  }
});

lock2.on('authenticated', function (authResult) {
  console.error('lock authenticated', authResult, lock2);
  authResultReplay.next(authResult);
  authResultReplay.complete();

  lock2.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // Handle error
      profileResultReplay.error(error);
      return;
    }
    profileResultReplay.next(profile);
    profileResultReplay.complete();
  });
});

export class Auth0AuthSetup implements AuthSetup {
  public getAuthResult(): Observable<AuthResult> {
    return authResultReplay.asObservable();
  }

  public getProfileResult(): Observable<ProfileResult> {
    return profileResultReplay.asObservable();
  }

  public showLogin(): void {
    lock2.show();
  }
}

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
    AuthoriseContainerDispatcher,
    { provide: AuthSetup, useClass: Auth0AuthSetup },
  ]
})
export class LoginModule { }
