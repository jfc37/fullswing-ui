import { SetPassesForStudent } from '../passes/passes.actions';
import { PassRepository } from '../../../shared/repositories/pass.repository';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './pass-purchase.actions';
import { CheckInState } from '../check-in.state';
import { getPassPurchaseState } from '../check-in.reducer';

@Injectable()
export class PassPurchaseEffects {

  @Effect()
  public purchase$: Observable<Action> = this.actions$
    .ofType<stateActions.PurchasePassRequest>(stateActions.PURCHASE_PASS_REQUEST)
    .withLatestFrom(this.store.select(getPassPurchaseState))
    .map(([action, state]) => state)
    .switchMap(state => this.repository.purchaseForStudent(state.studentId, state.passId)
      .mergeMap(passes => [
        new stateActions.PurchasePassSuccess(),
        new SetPassesForStudent(state.studentId, passes)
      ])
      .catch(() => Observable.of(new stateActions.PurchasePassFailure(`Failed purchasing pass`)))
    );

  constructor(
    private actions$: Actions,
    private repository: PassRepository,
    private store: Store<CheckInState>,
  ) { }
}
