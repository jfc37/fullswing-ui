import { Action } from '@ngrx/store';

export const RESET = '[Student Check In] Reset';

export const SET_STUDENT = '[Student Check In] Set Student';
export const SET_CLASS = '[Student In Class] Set Class';

export const CHECK_IN_REQUEST = '[Student In Class] Check In Request';
export const CHECK_IN_SUCCESS = '[Student In Class] Check In Success';
export const CHECK_IN_FAILURE = '[Student In Class] Check In Failure';

export const REMOVE_STUDENT_REQUEST = '[Student In Class] Remove Student Request';
export const REMOVE_STUDENT_SUCCESS = '[Student In Class] Remove Student Success';
export const REMOVE_STUDENT_FAILURE = '[Student In Class] Remove Student Failure';

export class ResetStudentCheckIn implements Action {
  public readonly type = RESET;
}

export class SetStudentForCheckIn implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export class SetClassForCheckIn implements Action {
  public readonly type = SET_CLASS;
  constructor(public classId: number) { }
}

export class CheckInRequest implements Action {
  public readonly type = CHECK_IN_REQUEST;
}

export class CheckInSuccess implements Action {
  public readonly type = CHECK_IN_SUCCESS;
}

export class CheckInFailure implements Action {
  public readonly type = CHECK_IN_FAILURE;

  constructor(public error: string) { }
}

export class RemoveStudentRequest implements Action {
  public readonly type = REMOVE_STUDENT_REQUEST;
}

export class RemoveStudentSuccess implements Action {
  public readonly type = REMOVE_STUDENT_SUCCESS;
}

export class RemoveStudentFailure implements Action {
  public readonly type = REMOVE_STUDENT_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetStudentCheckIn

  | SetStudentForCheckIn
  | SetClassForCheckIn

  | CheckInRequest
  | CheckInSuccess
  | CheckInFailure

  | RemoveStudentRequest
  | RemoveStudentSuccess
  | RemoveStudentFailure;
