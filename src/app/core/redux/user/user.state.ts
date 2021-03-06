import * as user from './user.actions';
import { tokenNotExpired } from 'angular2-jwt';

export interface UserState {
  authorisation: Authorisation;
  profile: Profile;
}

export interface Authorisation {
  idToken?: string;
  accessToken?: string;
}

export interface Profile {
  email?: string;
  name?: string;
  nickname?: string;
}
