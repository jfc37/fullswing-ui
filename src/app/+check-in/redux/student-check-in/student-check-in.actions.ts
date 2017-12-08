import { Action } from '@ngrx/store';

export const RESET = '[Student Check In] Reset';
export const SET_STUDENT = '[Student Check In] Set Student';

export class ResetStudentCheckIn implements Action {
  public readonly type = RESET;
}

export class SetStudentForCheckIn implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export type Actions
  = ResetStudentCheckIn
  | SetStudentForCheckIn;
