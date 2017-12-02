import { SetStudents } from '../students/students.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './classes.actions';
import { CheckInState } from '../check-in.state';
import { getSelectedClassSelector } from '../check-in.reducer';
import { ClassRepository } from '../../../shared/repositories/class.repository';

@Injectable()
export class ClassesEffects {

  @Effect()
  public setSelectedId$: Observable<Action> = this.actions$
    .ofType<stateActions.SetSelectedClassId>(stateActions.SET_SELECTED_CLASS_ID)
    .withLatestFrom(this.store.select(getSelectedClassSelector))
    .filter(([action, selectedClass]) => !selectedClass)
    .map(([action, selectedClass]) => action.id)
    .map(id => new stateActions.LoadClassRequest(id));

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadClassRequest>(stateActions.LOAD_CLASS_REQUEST)
    .map(action => action.id)
    .switchMap(id => this.repository.getById(id)
      .mergeMap(response => Observable.merge([
        new SetStudents(response.students),
        new stateActions.LoadClassSuccess(response.class),
      ]))
      .catch(() => Observable.of(new stateActions.LoadClassFailure(`Failed getting class`)))
    );

  constructor(
    private actions$: Actions,
    private repository: ClassRepository,
    private store: Store<CheckInState>,
  ) { }
}
