import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as stateActions from './user-claims.actions';
import { SET_AUTHORISATION, SetAuthorisation } from '../user/user.actions';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserClaimsEffects {
  @Effect()
  public setAuthorisation$: Observable<Action> = this.actions$
    .ofType<SetAuthorisation>(SET_AUTHORISATION)
    .filter(action => !!action.idToken)
    .mapTo(new stateActions.LoadClaimsRequest());

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadClaimsRequest>(stateActions.LOAD_CLAIMS_REQUEST)
    .switchMap(() => this._repository.getClaims()
      .map(claims => new stateActions.LoadClaimsSuccess(claims))
      .catch((err) => console.error('xxx USER CLAIMS ERROR', err) || Observable.of(new stateActions.LoadClaimsFailure(`Failed getting claims`)))
    );

  constructor(
    private actions$: Actions,
    private _repository: UserRepository,
  ) { }
}
