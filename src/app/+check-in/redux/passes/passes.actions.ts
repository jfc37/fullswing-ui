import { Action } from '@ngrx/store';
import { Pass } from '../../../shared/state-models/pass';

export const INITIALISE_FOR_STUDENT = '[Student Passes] Initialise For Student';

export const LOAD_PASSES_REQUEST = '[Student Passes] Load Request';
export const LOAD_PASSES_SUCCESS = '[Student Passes] Load Success';
export const LOAD_PASSES_FAILURE = '[Student Passes] Load Failure';

export class InitialisePassesForStudent implements Action {
  public readonly type = INITIALISE_FOR_STUDENT;

  constructor(public studentId) { }
}

export class LoadPassesRequest implements Action {
  public readonly type = LOAD_PASSES_REQUEST;

  constructor(public studentId) { }
}

export class LoadPassesSuccess implements Action {
  public readonly type = LOAD_PASSES_SUCCESS;

  constructor(public studentId, public passes: Pass[]) { }
}

export class LoadPassesFailure implements Action {
  public readonly type = LOAD_PASSES_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = InitialisePassesForStudent
  | LoadPassesRequest
  | LoadPassesSuccess
  | LoadPassesFailure;
