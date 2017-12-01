import { EnrolableBlockRepository } from '../../repositories/enrolable-block.repository';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './selected-blocks.actions';
import { EnrolmentState } from '../enrolment.state';
import { getSelectedBlockIdsSelector } from '../enrolment.reducer';

@Injectable()
export class SelectedBlocksEffects {

  @Effect()
  public enrol$: Observable<Action> = this._actions$
    .ofType<stateActions.EnrolInSelectedBlocksRequest>(stateActions.ENROL_IN_SELECTED_BLOCKS_REQUEST)
    .withLatestFrom(this._store.select(getSelectedBlockIdsSelector))
    .map(([action, ids]) => ids)
    .switchMap(ids => this._repository.enrol(ids)
      .map(blocks => new stateActions.EnrolInSelectedBlocksSuccess())
      .catch(() => Observable.of(new stateActions.EnrolInSelectedBlocksFailure(`Failed to enrol in blocks`)))
    );

  constructor(
    private _actions$: Actions,
    private _store: Store<EnrolmentState>,
    private _repository: EnrolableBlockRepository
  ) {}
}
