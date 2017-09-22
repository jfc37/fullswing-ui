import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { AuthService } from '../common/auth/auth.service';
import { AuthenticatedGuard } from './authenticated.guard';

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
    let setupReplay: ReplaySubject<null>;

    beforeEach(() => {
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(true);

      setupReplay = new ReplaySubject();
      authService.setupAuthentication = jasmine.createSpy('setup')
        .and.returnValue(setupReplay);

      router.navigateByUrl = jasmine.createSpy('navigate');
    });

    function flushAll() {
      setupReplay.complete();
    }

    it(`should kick off authentication setup`, () => {
      sut.canActivate(null, null);

      expect(authService.setupAuthentication).toHaveBeenCalled();
    });

    it(`should not check authenticated status when setup hasn't completed`, (done) => {
      sut.canActivate(null, null).subscribe();

      setupReplay.next(null);

      setupReplay.asObservable()
        .first()
        .finally(done)
        .subscribe(() => expect(authService.isAuthenticated).not.toHaveBeenCalled());
    });

    it(`should check authenticated status when setup completes`, (done) => {

      setupReplay.next(null);
      setupReplay.complete();

      sut.canActivate(null, null)
        .last()
        .finally(done)
        .subscribe(() => expect(authService.isAuthenticated).toHaveBeenCalled());
    });

    it(`should redirect to login when not authenticated`, (done) => {
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(false);

        setupReplay.next(null);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).toHaveBeenCalledWith('/login'));
    });

    it(`should not redirect when authenticated`, (done) => {
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(true);

        setupReplay.next(null);
      flushAll();

      sut.canActivate(null, null)
        .finally(done)
        .subscribe(() => expect(router.navigateByUrl).not.toHaveBeenCalled());
    });
  });
});
