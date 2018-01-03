import { getIsTeacherSelector, getAreUserClaimsLoadedSelector } from '../../reducers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(
    private _store: Store<State>,
    private _router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(getAreUserClaimsLoadedSelector)
    .filter(Boolean)
    .switchMap(() => this._store.select(getIsTeacherSelector))
      .first()
      .do(isTeacher => {
        if (!isTeacher) {
          this._router.navigateByUrl('/dashboard');
        }
      });
  }
}
