import { Action } from '@ngrx/store';
import { StudentDetails } from './new-student.state';

export const RESET = '[New Student] Reset';

export const SET_STUDENT = '[New Student] Set Student';

export const CREATE_STUDENT_REQUEST = '[New Student] Create Request';
export const CREATE_STUDENT_SUCCESS = '[New Student] Create Success';
export const CREATE_STUDENT_FAILURE = '[New Student] Create Failure';


export class ResetNewStudent implements Action {
  public readonly type = RESET;
}

export class SetNewStudent implements Action {
  public readonly type = SET_STUDENT;
  constructor(public student: StudentDetails) { }
}


export class CreateStudentRequest implements Action {
  public readonly type = CREATE_STUDENT_REQUEST;
}

export class CreateStudentSuccess implements Action {
  public readonly type = CREATE_STUDENT_SUCCESS;
  constructor(public id: number) { }
}

export class CreateStudentFailure implements Action {
  public readonly type = CREATE_STUDENT_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetNewStudent

  | SetNewStudent

  | CreateStudentRequest
  | CreateStudentSuccess
  | CreateStudentFailure;
