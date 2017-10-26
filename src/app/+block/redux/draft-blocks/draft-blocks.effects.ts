import { getSelectedDraftBlockSelector } from '../block.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import { LoadDraftBlockFailure, LoadDraftBlockSuccess, SaveSelectedDraftBlockSuccess, SaveSelectedDraftBlockFailure } from './draft-blocks.actions';
import * as stateActions from './draft-blocks.actions';
import { BlockState } from '../block.state';

@Injectable()
export class DraftBlocksEffects {

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadDraftBlockRequest>(stateActions.LOAD_DRAFT_BLOCK_REQUEST)
    .map(action => action.id)
    .switchMap(id => this.repository.getById(id)
      .map(block => new LoadDraftBlockSuccess(block))
      .catch(() => Observable.of(new LoadDraftBlockFailure(`Failed getting block`)))
    );

  @Effect()
  public save$: Observable<Action> = this.actions$
    .ofType<stateActions.SaveSelectedDraftBlockRequest>(stateActions.SAVE_SELECTED_DRAFT_BLOCK_REQUEST)
    .withLatestFrom(this._store.select(getSelectedDraftBlockSelector))
    .map(([action, selectedBlock]) => selectedBlock)
    .switchMap(selectedBlock => this.repository.update(selectedBlock)
      .map(() => new SaveSelectedDraftBlockSuccess())
      .catch(() => Observable.of(new SaveSelectedDraftBlockFailure(`Failed saving block`)))
    );

  constructor(
    private actions$: Actions,
    private repository: BlockRepository,
    private _store: Store<BlockState>
  ) { }
}
