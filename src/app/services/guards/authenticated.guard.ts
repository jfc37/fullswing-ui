import { AuthService } from '../common/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // const isAuthenticated = this._authService.isAuthenticated();

    // if (!isAuthenticated) {
    //   this._router.navigateByUrl('/login');
    // }

    // return isAuthenticated;
    return this._authService.setupAuthentication()
      .last()
      .map(() => this._authService.isAuthenticated())
      .do(isAuthenticated => {
        if (!isAuthenticated) {
          this._router.navigateByUrl('/login');
        }
      });
  }
}
