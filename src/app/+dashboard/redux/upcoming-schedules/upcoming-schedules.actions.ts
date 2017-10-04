import { Class } from '../../../shared/state-models/class';
import { Action } from '@ngrx/store';

export const LOAD_UPCOMING_SCHEDULE_REQUEST = '[Upcoming Schedule] Load Request';
export const LOAD_UPCOMING_SCHEDULE_SUCCESS = '[Upcoming Schedule] Load Success';
export const LOAD_UPCOMING_SCHEDULE_FAILURE = '[Upcoming Schedule] Load Failure';

export class LoadUpcomingScheduleRequest implements Action {
  public readonly type = LOAD_UPCOMING_SCHEDULE_REQUEST;
}

export class LoadUpcomingScheduleSuccess implements Action {
  public readonly type = LOAD_UPCOMING_SCHEDULE_SUCCESS;

  constructor(public classes: Class[]) { }
}

export class LoadUpcomingScheduleFailure implements Action {
  public readonly type = LOAD_UPCOMING_SCHEDULE_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = LoadUpcomingScheduleRequest
  | LoadUpcomingScheduleSuccess
  | LoadUpcomingScheduleFailure;
