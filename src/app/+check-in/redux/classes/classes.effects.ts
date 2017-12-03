import { CheckInRepository } from '../../repositories/check-in.repository';
import { SetStudents } from '../students/students.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './classes.actions';
import { CheckInState } from '../check-in.state';
import { getSelectedClassSelector, getSelectedClassIdSelector } from '../check-in.reducer';
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
    .switchMap(id => this.classRepository.getById(id)
      .mergeMap(response => Observable.merge([
        new SetStudents(response.students),
        new stateActions.LoadClassSuccess(response.class),
      ]))
      .catch(() => Observable.of(new stateActions.LoadClassFailure(`Failed getting class`)))
    );

  @Effect()
  public checkIn$: Observable<Action> = this.actions$
    .ofType<stateActions.CheckInRequest>(stateActions.CHECK_IN_REQUEST)
    .withLatestFrom(this.store.select(getSelectedClassIdSelector))
    .map(([action, classId]) => ({studentId: action.studentId, classId}))
    .switchMap(({classId, studentId}) => this.checkInRepository.checkInToClass(classId, studentId)
      .map(() => new stateActions.CheckInSuccess(studentId))
      .catch(() => Observable.of(new stateActions.CheckInFailure(`Failed checking student in`)))
    );

  @Effect()
  public removeFromClass$: Observable<Action> = this.actions$
    .ofType<stateActions.RemoveStudentRequest>(stateActions.REMOVE_STUDENT_REQUEST)
    .withLatestFrom(this.store.select(getSelectedClassIdSelector))
    .map(([action, classId]) => ({studentId: action.studentId, classId}))
    .switchMap(({classId, studentId}) => this.checkInRepository.removeFromClass(classId, studentId)
      .map(() => new stateActions.RemoveStudentSuccess(studentId))
      .catch(() => Observable.of(new stateActions.RemoveStudentFailure(`Failed removing student from class`)))
    );


  constructor(
    private actions$: Actions,
    private classRepository: ClassRepository,
    private checkInRepository: CheckInRepository,
    private store: Store<CheckInState>,
  ) { }
}
