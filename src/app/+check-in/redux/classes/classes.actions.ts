import { Action } from '@ngrx/store';
import { Class } from '../../../shared/state-models/class';

export const RESET_CLASSES = '[Check In Class] Reset';

export const LOAD_CLASS_REQUEST = '[Check In Class] Load Request';
export const LOAD_CLASS_SUCCESS = '[Check In Class] Load Success';
export const LOAD_CLASS_FAILURE = '[Check In Class] Load Failure';


export const ADD_STUDENT_TO_ATTENDANCE = '[Check In Class] Add Student To Attendance';
export const REMOVE_STUDENT_FROM_ATTENDANCE = '[Check In Class] Remove Student From Attendance';


export const ADD_STUDENT_TO_REGISTER = '[Check In Class] Add Student To Register';

export class ResetClass implements Action {
  public readonly type = RESET_CLASSES;
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


export class AddStudentToAttendance implements Action {
  public readonly type = ADD_STUDENT_TO_ATTENDANCE;

  constructor(public classId: number, public studentId: number) { }
}

export class RemoveStudentFromAttendance implements Action {
  public readonly type = REMOVE_STUDENT_FROM_ATTENDANCE;

  constructor(public classId: number, public studentId: number) { }
}


export class AddStudentToRegister implements Action {
  public readonly type = ADD_STUDENT_TO_REGISTER;

  constructor(public classId: number, public studentId: number) { }
}

export type Actions
  = ResetClass

  | LoadClassRequest
  | LoadClassSuccess
  | LoadClassFailure

  | AddStudentToAttendance
  | RemoveStudentFromAttendance

  | AddStudentToRegister;
