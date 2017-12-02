import { Action } from '@ngrx/store';
import { Class } from '../../../shared/state-models/class';

export const RESET_CLASSES = '[Check In Class] Reset';
export const SET_SELECTED_CLASS_ID = '[Check In Class] Set Selected Id';

export const LOAD_CLASS_REQUEST = '[Check In Class] Load Request';
export const LOAD_CLASS_SUCCESS = '[Check In Class] Load Success';
export const LOAD_CLASS_FAILURE = '[Check In Class] Load Failure';

export class ResetClass implements Action {
  public readonly type = RESET_CLASSES;
}

export class SetSelectedClassId implements Action {
  public readonly type = SET_SELECTED_CLASS_ID;
  constructor(public id: number) { }
}

export class LoadClassRequest implements Action {
  public readonly type = LOAD_CLASS_REQUEST;
  constructor(public id: number) { }
}

export class LoadClassSuccess implements Action {
  public readonly type = LOAD_CLASS_SUCCESS;

  constructor(public selectedClass: Class) { }
}

export class LoadClassFailure implements Action {
  public readonly type = LOAD_CLASS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
= ResetClass
| SetSelectedClassId
| LoadClassRequest
| LoadClassSuccess
| LoadClassFailure;
