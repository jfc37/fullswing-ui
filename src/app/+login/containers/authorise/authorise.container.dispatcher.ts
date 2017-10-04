import { InitialiseAuthorisation, SetAuthorisation, SetProfile } from '../../../core/redux/user/user.actions';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Profile, UserState } from '../../../core/redux/user/user.state';
import { AuthSetup } from '../../services/auth-setup.service';
import { LocalStorageService } from '../../../core/service/local-storage.service';

@Injectable()
export class AuthoriseContainerDispatcher {
  constructor(
    private _store: Store<UserState>,
    private _authSetup: AuthSetup,
    private _localStorage: LocalStorageService) { }

  public completeAuthorisation(): Observable<null> {
    const authResult$ = this._authSetup.getAuthResult()
      .first()
      .do(authResult => {
        this._localStorage.setIdToken(authResult.idToken);
        this._localStorage.setAccessToken(authResult.accessToken);
        this._store.dispatch(new SetAuthorisation(authResult.idToken, authResult.accessToken));
      });

    const profileResult$ = this._authSetup.getProfileResult()
      .first()
      .do(profileResult => {
        const profile = {
          email: profileResult.email,
          name: profileResult.name,
          nickname: profileResult.nickname,
          claims: [...profileResult.claims].map(claim => claim.resource)
        } as Profile;
        this._localStorage.setProfile(profile);
        this._store.dispatch(new SetProfile(profile));
      });

    return Observable.combineLatest(authResult$, profileResult$)
      .mapTo(null);
  }
}
