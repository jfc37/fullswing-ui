import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PassRepository } from '../../../shared/repositories/pass.repository';
import { LoadPassesFailure, LoadPassesSuccess } from './passes.actions';
import * as stateActions from './passes.actions';
import { CheckInState } from '../check-in.state';
import { getPassesForStudentSelector } from '../check-in.reducer';

@Injectable()
export class PassesEffects {

  @Effect()
  public intialiseForStudent$: Observable<Action> = this.actions$
    .ofType<stateActions.InitialiseForStudent>(stateActions.INITIALISE_FOR_STUDENT)
    .map(action => action.studentId)
    .withLatestFrom(this.store.select(getPassesForStudentSelector))
    .filter(([studentId, passes]) => !passes)
    .map(([studentId, passes]) => new stateActions.LoadPassesRequest(studentId));

  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadPassesRequest>(stateActions.LOAD_PASSES_REQUEST)
    .map(action => action.studentId)
    .switchMap(studentId => this.repository.getForStudent(studentId)
      .map(passes => new LoadPassesSuccess(studentId, passes))
      .catch(() => Observable.of(new LoadPassesFailure(`Failed getting passes for student`)))
    );

  constructor(
    private actions$: Actions,
    private repository: PassRepository,
    private store: Store<CheckInState>,
  ) { }
}
