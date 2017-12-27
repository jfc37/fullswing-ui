import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './new-student.actions';
import { CheckInState } from '../check-in.state';
import { CheckInRepository } from '../../repositories/check-in.repository';
import { getNewStudentDetailsSelector } from '../check-in.reducer';
import { SetStudents } from '../students/students.actions';

@Injectable()
export class NewStudentEffects {

  @Effect()
  public create$: Observable<Action> = this.actions$
    .ofType<stateActions.CreateStudentRequest>(stateActions.CREATE_STUDENT_REQUEST)
    .withLatestFrom(this.store.select(getNewStudentDetailsSelector))
    .map(([action, student]) => student)
    .switchMap(student => this.repository.createStudent(student)
      .mergeMap(newStudent => [
        new stateActions.CreateStudentSuccess(newStudent.id),
        new SetStudents([newStudent])
      ])
      .catch(() => Observable.of(new stateActions.CreateStudentFailure(`Failed creating student`)))
    );

  constructor(
    private actions$: Actions,
    private repository: CheckInRepository,
    private store: Store<CheckInState>,
  ) { }
}
