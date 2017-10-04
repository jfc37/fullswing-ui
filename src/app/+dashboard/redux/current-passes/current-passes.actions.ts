import { Action } from '@ngrx/store';
import { Pass } from '../../../shared/state-models/pass';

export const LOAD_CURRENT_PASSES_REQUEST = '[Current Passes] Load Request';
export const LOAD_CURRENT_PASSES_SUCCESS = '[Current Passes] Load Success';
export const LOAD_CURRENT_PASSES_FAILURE = '[Current Passes] Load Failure';

export class LoadCurrentPassesRequest implements Action {
  public readonly type = LOAD_CURRENT_PASSES_REQUEST;
}

export class LoadCurrentPassesSuccess implements Action {
  public readonly type = LOAD_CURRENT_PASSES_SUCCESS;

  constructor(public passes: Pass[]) { }
}

export class LoadCurrentPassesFailure implements Action {
  public readonly type = LOAD_CURRENT_PASSES_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = LoadCurrentPassesRequest
  | LoadCurrentPassesSuccess
  | LoadCurrentPassesFailure;
