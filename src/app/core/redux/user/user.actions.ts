import { Action } from '@ngrx/store';
import { Authorisation, Profile } from './user.state';

export const INITIALISE_AUTHORISATION = '[User] Initialise Authorisation';
export const INITIALISE_PROFILE = '[User] Initialise Profile';
export const SET_AUTHORISATION = '[User] Set Authorisation';
export const SET_PROFILE = '[User] Set Profile';

export const LOG_OUT = '[User] Log out';

export class InitialiseAuthorisation implements Action {
  public readonly type = INITIALISE_AUTHORISATION;
}

export class InitialiseProfile implements Action {
  public readonly type = INITIALISE_PROFILE;
}

export class SetAuthorisation implements Action {
  public readonly type = SET_AUTHORISATION;

  constructor(public idToken: string, public accessToken: string) {}
}

export class SetProfile implements Action {
  public readonly type = SET_PROFILE;

  constructor(public profile: Profile) {}
}

export class Logout implements Action {
  public readonly type = LOG_OUT;
}

export type Actions
  = InitialiseAuthorisation
  | InitialiseProfile
  | SetAuthorisation
  | SetProfile
  | Logout;
