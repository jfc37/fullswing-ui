import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '../redux/user/user.state';
import { getIsUserAuthenticated } from '../../reducers/index';

@Injectable()
export class AuthService {
  constructor(
    private _store: Store<UserState>
  ) {}

  public isAuthenticated(): Observable<boolean> {
    return this._store.select(getIsUserAuthenticated)
      .first();
  }
}
