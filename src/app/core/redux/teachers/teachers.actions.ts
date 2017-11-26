import { Action } from '@ngrx/store';
import { User } from '../../../shared/state-models/teacher';

export const LOAD_TEACHERS_REQUEST = '[Teacher] Load Request';
export const LOAD_TEACHERS_SUCCESS = '[Teacher] Load Success';
export const LOAD_TEACHERS_FAILURE = '[Teacher] Load Failure';

export class LoadTeachersRequest implements Action {
  public readonly type = LOAD_TEACHERS_REQUEST;
}

export class LoadTeachersSuccess implements Action {
  public readonly type = LOAD_TEACHERS_SUCCESS;

  constructor(public teachers: User[]) { }
}

export class LoadTeachersFailure implements Action {
  public readonly type = LOAD_TEACHERS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = LoadTeachersRequest
  | LoadTeachersSuccess
  | LoadTeachersFailure;
