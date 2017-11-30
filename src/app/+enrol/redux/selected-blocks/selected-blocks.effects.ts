import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './selected-blocks.actions';

@Injectable()
export class SelectedBlocksEffects {

  @Effect()
  public enrol$: Observable<Action> = this.actions$
    .ofType<stateActions.EnrolInSelectedBlocksRequest>(stateActions.ENROL_IN_SELECTED_BLOCKS_REQUEST)
    // .delay(2000)
    .map(() => new stateActions.EnrolInSelectedBlocksSuccess());

  constructor(
    private actions$: Actions,
  ) {}
}
