import { getHasBlockSummariesLoadedSelector } from '../block.reducer';
import { BlockState } from '../block.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import { LoadBlockSummariesFailure, LoadBlockSummariesSuccess } from './block-summaries.actions';
import * as stateActions from './block-summaries.actions';

@Injectable()
export class BlockSummariesEffects {
  @Effect()
  public load$: Observable<Action> = this._actions$
    .ofType<stateActions.LoadBlockSummariesRequest>(stateActions.LOAD_BLOCK_SUMMARIES_REQUEST)
    .withLatestFrom(this._store.select(getHasBlockSummariesLoadedSelector))
    .map(([action, areLoaded]) => areLoaded)
    .filter(areLoaded => !areLoaded)
    .switchMap(() => this._repository.getAll()
      .map(passes => new LoadBlockSummariesSuccess(passes))
      .catch(() => Observable.of(new LoadBlockSummariesFailure(`Failed getting blocks`)))
    );

  constructor(
    private _actions$: Actions,
    private _repository: BlockRepository,
    private _store: Store<BlockState>,
  ) {}
}
