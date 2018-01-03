import { Action } from '@ngrx/store';

export const RESET = '[Pass Purchase] Reset';
export const SET_STUDENT = '[Pass Purchase] Set Student';
export const SET_PASS = '[Pass Purchase] Set Pass';

export const PURCHASE_PASS_REQUEST = '[Pass Purchase] Purchase Request';
export const PURCHASE_PASS_SUCCESS = '[Pass Purchase] Purchase Success';
export const PURCHASE_PASS_FAILURE = '[Pass Purchase] Purchase Failure';


export class ResetPassPurchase implements Action {
  public readonly type = RESET;
}

export class SetStudentForPassPurchase implements Action {
  public readonly type = SET_STUDENT;
  constructor(public studentId: number) { }
}

export class SetPassForPurchase implements Action {
  public readonly type = SET_PASS;
  constructor(public passId: number) { }
}


export class PurchasePassRequest implements Action {
  public readonly type = PURCHASE_PASS_REQUEST;
}

export class PurchasePassSuccess implements Action {
  public readonly type = PURCHASE_PASS_SUCCESS;
}

export class PurchasePassFailure implements Action {
  public readonly type = PURCHASE_PASS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetPassPurchase

  | SetStudentForPassPurchase
  | SetPassForPurchase

  | PurchasePassRequest
  | PurchasePassSuccess
  | PurchasePassFailure;
