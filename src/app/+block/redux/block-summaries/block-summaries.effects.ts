import { getHasBlockSummariesLoadedSelector } from '../block.reducer';
import { BlockState } from '../block.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import {
  AddBlockSummaries,
  DeleteBlockSummariesFailure,
  DeleteBlockSummariesSuccess,
  GenerateBlockSummariesFailure,
  GenerateBlockSummariesSuccess,
  LoadBlockSummariesFailure,
  LoadBlockSummariesSuccess,
} from './block-summaries.actions';
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

  @Effect()
  public delete$: Observable<Action> = this._actions$
    .ofType<stateActions.DeleteBlockSummariesRequest>(stateActions.DELETE_BLOCK_SUMMARIES_REQUEST)
    .map(action => action.id)
    .switchMap(id => this._repository.delete(id)
      .map(() => new DeleteBlockSummariesSuccess(id))
      .catch(() => Observable.of(new DeleteBlockSummariesFailure(id, `Failed deleting block`)))
    );

  @Effect()
  public generate$: Observable<Action> = this._actions$
    .ofType<stateActions.GenerateBlockSummariesRequest>(stateActions.GENERATE_BLOCK_SUMMARIES_REQUEST)
    .map(action => action.id)
    .switchMap(id => this._repository.generate(id)
    .mergeMap(generatedBlock => Observable.merge([
      new GenerateBlockSummariesSuccess(id),
      new AddBlockSummaries(generatedBlock),
    ]))
      .catch(() => Observable.of(new GenerateBlockSummariesFailure(id, `Failed generating block`)))
    );

  constructor(
    private _actions$: Actions,
    private _repository: BlockRepository,
    private _store: Store<BlockState>,
  ) {}
}
