import { SetClassForCheckIn, SET_CLASS } from '../student-check-in/student-check-in.actions';
import { CheckInRepository } from '../../repositories/check-in.repository';
import { SetStudents } from '../students/students.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as stateActions from './classes.actions';
import { CheckInState } from '../check-in.state';
import { getSelectedClassSelector, getCheckInClassId } from '../check-in.reducer';
import { ClassRepository } from '../../../shared/repositories/class.repository';

@Injectable()
export class ClassesEffects {

  @Effect()
  public setSelectedId$: Observable<Action> = this.actions$
    .ofType<SetClassForCheckIn>(SET_CLASS)
    .withLatestFrom(this.store.select(getSelectedClassSelector))
    .filter(([action, selectedClass]) => !selectedClass)
    .map(([action, selectedClass]) => action.classId)
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

  constructor(
    private actions$: Actions,
    private classRepository: ClassRepository,
    private checkInRepository: CheckInRepository,
    private store: Store<CheckInState>,
  ) { }
}
