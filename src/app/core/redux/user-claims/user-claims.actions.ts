import { Action } from '@ngrx/store';

export const LOAD_CLAIMS_REQUEST = '[User Claims] Load';
export const LOAD_CLAIMS_SUCCESS = '[User Claims] Load Success';
export const LOAD_CLAIMS_FAILURE = '[User Claims] Load Failure';


export class LoadClaimsRequest implements Action {
  public readonly type = LOAD_CLAIMS_REQUEST;
}

export class LoadClaimsSuccess implements Action {
  public readonly type = LOAD_CLAIMS_SUCCESS;

  constructor(public claims: string[]) { }
}

export class LoadClaimsFailure implements Action {
  public readonly type = LOAD_CLAIMS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
= LoadClaimsRequest
| LoadClaimsSuccess
| LoadClaimsFailure;
