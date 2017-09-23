import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Observable } from 'rxjs';

const clientId = 'jaLVtw90tXt8tCCBIHIUJLIcP2p2MMdE';
const domain = 'jfc-dev.au.auth0.com';
const lock = new Auth0Lock(clientId, domain);

lock.on('authenticated', function (authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
  localStorage.setItem('access_token', authResult.accessToken);
  console.error('xxx authenticated');
  lock.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

@Injectable()
export class AuthService {
  public login(): void {
    lock.show();
  }

  public setupAuthentication(): Observable<null> {
    return Observable.of(null).delay(1000);
  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');
    console.error('yyy checking', accessToken, idToken);

    if (!accessToken || !idToken) {
      return false;
    }

    return tokenNotExpired(accessToken, idToken);
  }
}
