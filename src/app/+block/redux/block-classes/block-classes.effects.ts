import { LoadBlockClassesRequest } from './block-classes.actions';
import { getSelectedBlockClassesSelector } from '../block.reducer';
import { BlockState } from '../block.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ClassRepository } from '../../../shared/repositories/class.repository';
import * as stateActions from './block-classes.actions';
import { SetClasses } from '../classes/classes.actions';

@Injectable()
export class BlockClassesEffects {

  @Effect()
  public setSelectedId$: Observable<Action> = this.actions$
    .ofType<stateActions.SetSelectedBlockId>(stateActions.SET_SELECTED_BLOCK_ID)
    .withLatestFrom(this.store.select(getSelectedBlockClassesSelector))
    .filter(([action, classes]) => !classes)
    .map(([action, classes]) => action.id)
    .map(blockId => new LoadBlockClassesRequest(blockId));

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadBlockClassesRequest>(stateActions.LOAD_BLOCK_CLASSES_REQUEST)
    .map(action => action.id)
    .switchMap(id => this.repository.getForBlock(id)
      .mergeMap(classes => Observable.merge([
        new SetClasses(classes),
        new stateActions.LoadBlockClassesSuccess(id, classes.map(c => c.id)),
      ]))
      .catch(() => Observable.of(new stateActions.LoadBlockClassesFailure(`Failed getting block classes`)))
    );

  constructor(
    private actions$: Actions,
    private repository: ClassRepository,
    private store: Store<BlockState>,
  ) { }
}
