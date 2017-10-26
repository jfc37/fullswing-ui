import { getAreTeachersLoadedSelector } from '../../../reducers';
import { TeachersState } from './teachers.state';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TeacherRepository } from '../../../shared/repositories/teacher.repository';
import { LoadTeachersFailure, LoadTeachersSuccess } from './teachers.actions';
import * as stateActions from './teachers.actions';

@Injectable()
export class TeachersEffects {
  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<stateActions.LoadTeachersRequest>(stateActions.LOAD_TEACHERS_REQUEST)
    .withLatestFrom(this._store.select(getAreTeachersLoadedSelector))
    .map(([action, areLoaded]) => areLoaded)
    .filter(areLoaded => !areLoaded)
    .switchMap(() => this.repository.getAll()
      .map(passes => new LoadTeachersSuccess(passes))
      .catch(() => Observable.of(new LoadTeachersFailure(`Failed getting teachers`)))
    );

  constructor(
    private actions$: Actions,
    private repository: TeacherRepository,
    private _store: Store<TeachersState>
  ) {}
}
