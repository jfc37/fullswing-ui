import { AddStudentToAttendance, RemoveStudentFromAttendance } from '../classes/classes.actions';
import { CheckInRepository } from '../../repositories/check-in.repository';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './student-check-in.actions';
import { CheckInState } from '../check-in.state';
import { getCheckInClassId, getStudentCheckInState } from '../check-in.reducer';

@Injectable()
export class StudentCheckInEffects {

  @Effect()
  public checkIn$: Observable<Action> = this.actions$
    .ofType<stateActions.CheckInRequest>(stateActions.CHECK_IN_REQUEST)
    .withLatestFrom(this.store.select(getStudentCheckInState))
    .map(([action, state]) => state)
    .switchMap(state => this.checkInRepository.checkInToClass(state.classId, state.studentId)
      .mergeMap(() => [
        new stateActions.CheckInSuccess(),
        new AddStudentToAttendance(state.classId, state.studentId)
      ])
      .catch(() => Observable.of(new stateActions.CheckInFailure(`Failed checking student in`)))
    );

  @Effect()
  public removeFromClass$: Observable<Action> = this.actions$
    .ofType<stateActions.RemoveStudentRequest>(stateActions.REMOVE_STUDENT_REQUEST)
    .withLatestFrom(this.store.select(getStudentCheckInState))
    .map(([action, state]) => state)
    .switchMap(state => this.checkInRepository.removeFromClass(state.classId, state.studentId)
      .mergeMap(() => [
        new stateActions.RemoveStudentSuccess(),
        new RemoveStudentFromAttendance(state.classId, state.studentId)
      ])
      .catch(() => Observable.of(new stateActions.RemoveStudentFailure(`Failed removing student from class`)))
    );


  constructor(
    private actions$: Actions,
    private checkInRepository: CheckInRepository,
    private store: Store<CheckInState>,
  ) { }
}
