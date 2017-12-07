import { Action } from '@ngrx/store';

export const RESET = '[Pass Purchase] Reset';
export const SET_STUDENT = '[Pass Purchase] Set Student';
export const SET_PASS = '[Pass Purchase] Set Pass';

export class Reset implements Action {
  public readonly type = RESET;
}

export class SetStudent implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export class SetPass implements Action {
  public readonly type = SET_PASS;
  constructor(public passId: number) { }
}

export type Actions
  = Reset
  | SetStudent
  | SetPass;
