import { CreateBlockFailure, CreateBlockSuccess } from './new-block.actions';
import { getNewBlockSelector } from '../block.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import * as stateActions from './new-block.actions';
import { BlockState } from '../block.state';

@Injectable()
export class NewBlockEffects {

  @Effect()
  public create$: Observable<Action> = this._actions$
    .ofType<stateActions.CreateBlockRequest>(stateActions.CREATE_BLOCK_REQUEST)
    .withLatestFrom(this._store.select(getNewBlockSelector))
    .map(([action, block]) => block)
    .switchMap(block => this._repository.create(block)
      .map(() => new CreateBlockSuccess())
      .catch(() => Observable.of(new CreateBlockFailure(`Failed creating block`)))
    );

  constructor(
    private _actions$: Actions,
    private _repository: BlockRepository,
    private _store: Store<BlockState>
  ) { }
}
