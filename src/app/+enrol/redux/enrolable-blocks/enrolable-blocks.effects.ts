import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './enrolable-blocks.actions';
import { EnrolmentState } from '../enrolment.state';
import { getHasLoadedEnrolableBlocksSelector } from '../enrolment.reducer';
import { EnrolableBlockRepository } from '../../repositories/enrolable-block.repository';

@Injectable()
export class EnrolableBlocksEffects {
  @Effect()
  public initialise$: Observable<Action> = this._actions$
    .ofType<stateActions.InitialiseBlockEnrolment>(stateActions.INITIALISE_BLOCK_ENROLMENT)
    .withLatestFrom(this._store.select(getHasLoadedEnrolableBlocksSelector))
    .map(([action, areLoaded]) => areLoaded)
    .filter(areLoaded => !areLoaded)
    .map(action => new stateActions.LoadEnrolableBlocksRequest());

    @Effect()
    public load$: Observable<Action> = this._actions$
      .ofType<stateActions.LoadEnrolableBlocksRequest>(stateActions.LOAD_ENROLABLE_BLOCKS_REQUEST)
      .switchMap(() => this._repository.getAll()
        .map(blocks => new stateActions.LoadEnrolableBlocksSuccess(blocks))
        .catch(() => Observable.of(new stateActions.LoadEnrolableBlocksFailure(`Failed getting enrolable blocks`)))
      );

  constructor(
    private _actions$: Actions,
    private _store: Store<EnrolmentState>,
    private _repository: EnrolableBlockRepository,
  ) {}
}
