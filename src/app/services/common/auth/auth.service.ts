import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class AuthService {

  private _userProfile: any;

  private _auth0 = new auth0.WebAuth({
    clientID: 'jaLVtw90tXt8tCCBIHIUJLIcP2p2MMdE',
    domain: 'jfc-dev.au.auth0.com',
    responseType: 'token id_token',
    audience: 'https://jfc-dev.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/dashboard',
    scope: 'openid profile'
  });

  constructor(public router: Router, private http: Http) { }

  public login(): void {
    this._auth0.authorize();
  }

  public setupAuthentication(): Observable<null> {
    const completed = new ReplaySubject<null>();

    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        console.error(err);
      }
      completed.next(null);
      completed.complete();
    });

    return completed.asObservable();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this._auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this._userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
