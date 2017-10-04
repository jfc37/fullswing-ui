import { Observable } from 'rxjs';

export abstract class AuthSetup {
  public abstract getAuthResult(): Observable<AuthResult>;
  public abstract getProfileResult(): Observable<ProfileResult>;
  public abstract showLogin(): void;
}

export interface AuthResult {
  idToken: string;
  accessToken: string;
}

export interface ProfileResult {
  email: string;
  name: string;
  nickname: string;
  claims: [{resource: string}];
}
