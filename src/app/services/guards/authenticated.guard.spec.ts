import { AuthService } from '../common/auth/auth.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticatedGuard,
        {provide: AuthService, useValue: {}}
      ]
    });

    authService = TestBed.get(AuthService);
  });

  it('should exist', inject([AuthenticatedGuard], (guard: AuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should be false when not authenticated', inject([AuthenticatedGuard], (guard: AuthenticatedGuard) => {
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(false);

      expect(guard.canActivate(null, null)).toBe(false);
    }));

    it('should be true when authenticated', inject([AuthenticatedGuard], (guard: AuthenticatedGuard) => {
      authService.isAuthenticated = jasmine.createSpy('isAuthenticated')
        .and.returnValue(true);

      expect(guard.canActivate(null, null)).toBe(true);
    }));
  });
});
