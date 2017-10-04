import { ClassRepository } from '../../../shared/repositories/class.repository';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as upcomingSchedule from './upcoming-schedules.actions';
import { LoadUpcomingScheduleSuccess, LoadUpcomingScheduleFailure } from './upcoming-schedules.actions';

@Injectable()
export class UpcomingScheduleEffects {
  @Effect()
  public load$: Observable<Action> = this.actions$
    .ofType<upcomingSchedule.LoadUpcomingScheduleRequest>(upcomingSchedule.LOAD_UPCOMING_SCHEDULE_REQUEST)
    .switchMap(() => this.repository.getUpcomingSchedule()
      .map(passes => new LoadUpcomingScheduleSuccess(passes))
      .catch(() => Observable.of(new LoadUpcomingScheduleFailure(`Failed getting upcoming schedule`)))
    );

  constructor(
    private actions$: Actions,
    private repository: ClassRepository
  ) {}
}
