import { SetAuthorisation, SetProfile } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../../service/local-storage.service';
import * as user from './user.actions';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class UserEffects {
  @Effect()
  public initialiseAuthorisation$: Observable<Action> = this.actions$
    .ofType<user.InitialiseAuthorisation>(user.INITIALISE_AUTHORISATION)
    .startWith(new user.InitialiseAuthorisation())
    .map(() => ({
      accessToken: this.localStorageService.getAccessToken(),
      idToken: this.localStorageService.getIdToken(),
    }))
    .map(({ accessToken, idToken }) => new user.SetAuthorisation(idToken, accessToken));

  @Effect()
  public initialiseProfile$: Observable<Action> = this.actions$
    .ofType<user.InitialiseProfile>(user.INITIALISE_PROFILE)
    .startWith(new user.InitialiseProfile())
    .map(() => this.localStorageService.getProfile())
    .filter(profile => !!profile)
    .map(profile => new user.SetProfile(profile));

  @Effect()
  public logout$: Observable<Action> = this.actions$
    .ofType<user.Logout>(user.LOG_OUT)
    .do(() => {
      this.localStorageService.removeIdToken();
      this.localStorageService.removeAccessToken();
      this.localStorageService.removeProfile();

      this.router.navigate(['/login']);
    })
    .mergeMap(() => [
      new SetAuthorisation(null, null),
      new SetProfile(null)
    ]);

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }
}
