import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './student-search.actions';
import { UserRepository } from '../../../core/repositories/user.repository';
import { CheckInState } from '../check-in.state';
import { getStudentSearchTextSelector } from '../check-in.reducer';
import { SetStudents } from '../students/students.actions';

@Injectable()
export class StudentSearchEffects {

  @Effect()
  public setSearchText$: Observable<Action> = this.actions$
    .ofType<stateActions.SetStudentSearchText>(stateActions.SET_STUDENT_SEARCH_TEXT)
    .withLatestFrom(this.store.select(getStudentSearchTextSelector))
    .map(([action, text]) => text)
    .map(text => !!text
      ? new stateActions.StudentSearchRequest()
      : new stateActions.ResetStudentSearch());

  @Effect()
  public search$: Observable<Action> = this.actions$
    .ofType<stateActions.StudentSearchRequest>(stateActions.STUDENT_SEARCH_REQUEST)
    .withLatestFrom(this.store.select(getStudentSearchTextSelector))
    .map(([action, text]) => text)
    .switchMap(text => this.repository.search(text)
      .mergeMap(users => [
        new stateActions.StudentSearchSuccess(),
        new stateActions.SetStudentSearchResults(users),
        new SetStudents(users),
      ])
      .catch(() => Observable.of(new stateActions.StudentSearchFailure(`Failed getting students`)))
    );

  constructor(
    private actions$: Actions,
    private repository: UserRepository,
    private store: Store<CheckInState>,
  ) { }
}
