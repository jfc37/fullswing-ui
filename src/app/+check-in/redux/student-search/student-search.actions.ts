import { Action } from '@ngrx/store';
import { User } from '../../../shared/state-models/teacher';

export const RESET_STUDENT_SEARCH = '[Student Search] Reset';

export const SET_STUDENT_SEARCH_TEXT = '[Student Search] Set Search Text';
export const SET_STUDENT_SEARCH_RESULTS = '[Student Search] Set Search Results';


export const STUDENT_SEARCH_REQUEST = '[Student Search] Search Request';
export const STUDENT_SEARCH_SUCCESS = '[Student Search] Search Success';
export const STUDENT_SEARCH_FAILURE = '[Student Search] Search Failure';

export class ResetStudentSearch implements Action {
  public readonly type = RESET_STUDENT_SEARCH;
}

export class SetStudentSearchText implements Action {
  public readonly type = SET_STUDENT_SEARCH_TEXT;

  constructor(public searchText: string) {}
}

export class SetStudentSearchResults implements Action {
  public readonly type = SET_STUDENT_SEARCH_RESULTS;

  constructor(public searchResults: User[]) {}
}


export class StudentSearchRequest implements Action {
  public readonly type = STUDENT_SEARCH_REQUEST;
}

export class StudentSearchSuccess implements Action {
  public readonly type = STUDENT_SEARCH_SUCCESS;
}

export class StudentSearchFailure implements Action {
  public readonly type = STUDENT_SEARCH_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetStudentSearch
  | SetStudentSearchText
  | SetStudentSearchResults
  | StudentSearchRequest
  | StudentSearchSuccess
  | StudentSearchFailure;
