import { Action } from '@ngrx/store';

export const SET_CURRENT_STUDENT = '[Check In Current Student] Set';

export class SetCurrentStudent implements Action {
  public readonly type = SET_CURRENT_STUDENT;
  constructor(public studentId: number) { }
}

export type Actions
  = SetCurrentStudent;
