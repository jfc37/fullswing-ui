import { Action } from '@ngrx/store';

export const RESET = '[Student Enrol] Reset';

export const SET_STUDENT = '[Student Enrol] Set Student';
export const SET_BLOCK = '[Student Enrol] Set Block';

export const STUDENT_ENROL_REQUEST = '[Student Enrol] Enrol Request';
export const STUDENT_ENROL_SUCCESS = '[Student Enrol] Enrol Success';
export const STUDENT_ENROL_FAILURE = '[Student Enrol] Enrol Failure';

export const STUDENT_ENROLMENT_COMPLETE = '[Student Enrol] Enrolment Complete';


export class ResetStudentEnrol implements Action {
  public readonly type = RESET;
}

export class SetStudentToEnrol implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export class SetBlockToEnrolIn implements Action {
  public readonly type = SET_BLOCK;
  constructor(public blockId: number) { }
}

export class StudentEnrolRequest implements Action {
  public readonly type = STUDENT_ENROL_REQUEST;
}

export class StudentEnrolSuccess implements Action {
  public readonly type = STUDENT_ENROL_SUCCESS;
}

export class StudentEnrolFailure implements Action {
  public readonly type = STUDENT_ENROL_FAILURE;

  constructor(public error: string) { }
}


export class StudentEnrolmentComplete implements Action {
  public readonly type = STUDENT_ENROLMENT_COMPLETE;
}

export type Actions
  = ResetStudentEnrol

  | SetStudentToEnrol
  | SetBlockToEnrolIn

  | StudentEnrolRequest
  | StudentEnrolSuccess
  | StudentEnrolFailure

  | StudentEnrolmentComplete;
