import { User } from '../../../shared/state-models/teacher';
import { Action } from '@ngrx/store';

export const SET_STUDENTS = '[Check In Students] Set';

export class SetStudents implements Action {
  public readonly type = SET_STUDENTS;
  constructor(public students: User[]) { }
}

export type Actions
  = SetStudents;
