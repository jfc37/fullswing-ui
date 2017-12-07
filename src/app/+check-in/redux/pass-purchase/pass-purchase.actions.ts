import { Action } from '@ngrx/store';

export const SET_STUDENT = '[Pass Purchase] Set Student';

export class SetStudent implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export type Actions
  = SetStudent;
