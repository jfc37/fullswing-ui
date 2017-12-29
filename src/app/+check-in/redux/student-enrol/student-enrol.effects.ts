import { CheckInRepository } from '../../repositories/check-in.repository';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './student-enrol.actions';
import { CheckInState } from '../check-in.state';
import { getStudentEnrolState, getCheckInClassId } from '../check-in.reducer';
import { AddStudentToRegister } from '../classes/classes.actions';

@Injectable()
export class StudentEnrolEffects {

  @Effect()
  public enrol$: Observable<Action> = this.actions$
    .ofType<stateActions.StudentEnrolRequest>(stateActions.STUDENT_ENROL_REQUEST)
    .withLatestFrom(this.store.select(getStudentEnrolState))
    .map(([action, state]) => state)
    .withLatestFrom(this.store.select(getCheckInClassId))
    .switchMap(([state, classId]) => this.checkInRepository.enrolInBlock(state.blockId, state.studentId)
      .mergeMap(() => [
        new stateActions.StudentEnrolSuccess(),
        new AddStudentToRegister(classId, state.studentId)
      ])
      .catch(() => Observable.of(new stateActions.StudentEnrolFailure(`Failed enrolling student`)))
    );

  constructor(
    private actions$: Actions,
    private checkInRepository: CheckInRepository,
    private store: Store<CheckInState>,
  ) { }
}
