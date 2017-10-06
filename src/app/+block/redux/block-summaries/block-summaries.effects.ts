import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BlockRepository } from '../../../shared/repositories/block.repository';
import { LoadBlockSummariesFailure, LoadBlockSummariesSuccess } from './block-summaries.actions';
import * as stateActions from './block-summaries.actions';

@Injectable()
export class BlockSummariesEffects {
  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadBlockSummariesRequest>(stateActions.LOAD_BLOCK_SUMMARIES_REQUEST)
    .switchMap(() => this.repository.getAll()
      .map(passes => new LoadBlockSummariesSuccess(passes))
      .catch(() => Observable.of(new LoadBlockSummariesFailure(`Failed getting blocks`)))
    );

  constructor(
    private actions$: Actions,
    private repository: BlockRepository
  ) {}
}
