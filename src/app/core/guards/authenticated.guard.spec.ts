import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { AuthenticatedGuard } from './authenticated.guard';
import { AuthService } from '../service/auth.service';

describe('AuthenticatedGuard', () => {
  let authService: AuthService;
  let router: Router;
  let sut: AuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticatedGuard,
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    sut = TestBed.get(AuthenticatedGuard);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('canActivate', () => {
    let isAuthenticatedReplay: ReplaySubject<boolean>;

    beforeEach(() => {
      isAuthenticatedReplay = new ReplaySubject();
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(isAuthenticatedReplay);

      router.navigateByUrl = jasmine.createSpy('navigate');
    });

    function flushAll() {
      isAuthenticatedReplay.complete();
    }

    it(`should be true when user is authenticated`, done => {
      isAuthenticatedReplay.next(true);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(canActivate => expect(canActivate).toBe(true));
    });

    it(`should be false when user is not authenticated`, done => {
      isAuthenticatedReplay.next(false);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(canActivate => expect(canActivate).toBe(false));
    });

    it(`should redirect to login when not authenticated`, (done) => {
      isAuthenticatedReplay.next(false);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).toHaveBeenCalledWith('/login'));
    });

    it(`should not redirect when authenticated`, (done) => {
      isAuthenticatedReplay.next(true);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).not.toHaveBeenCalled());
    });
  });
});
