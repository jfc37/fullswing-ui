import { InitialiseProfile, Logout, SetAuthorisation, SetProfile } from './user.actions';
import { LocalStorageService } from '../../service/local-storage.service';
import { UserEffects } from './user.effects';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';
import { Action } from '@ngrx/store';
import { marbles } from 'rxjs-marbles';
import { ineeda } from 'ineeda';
import { Profile } from './user.state';
import { Router } from '@angular/router';
import { authorisationChecks } from './user.selectors';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

function makeTokenExpired() {
  authorisationChecks.tokenNotExpired = jasmine.createSpy('expired')
    .and.returnValue(false);
}

function makeTokenValid() {
  authorisationChecks.tokenNotExpired = jasmine.createSpy('expired')
    .and.returnValue(true);
}

describe('UserEffects', () => {
  let sut: UserEffects;

  let actions$: TestActions;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        { provide: Actions, useFactory: getActions },
        { provide: LocalStorageService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    });

    sut = TestBed.get(UserEffects);
    localStorageService = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
    actions$ = TestBed.get(Actions);

    makeTokenValid();

    localStorageService.getIdToken = jasmine.createSpy('get')
      .and.returnValue(null);
    localStorageService.getAccessToken = jasmine.createSpy('getAccessToken')
      .and.returnValue(null);
    localStorageService.getProfile = jasmine.createSpy('getProfile')
      .and.returnValue(null);

    Observable.timer = jasmine.createSpy('timer')
      .and.returnValue(Observable.of(1));
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('initialiseAuthorisation', () => {
    it(`should emit 'SetAuthorisation' when id and access token exists in local storage`, marbles((m) => {
      const expectedIdToken = 'aaa';
      const expectedAccessToken = 'aaa';
      localStorageService.getIdToken = jasmine.createSpy('get')
        .and.returnValue(expectedIdToken);
      localStorageService.getAccessToken = jasmine.createSpy('get')
        .and.returnValue(expectedAccessToken);

      const completion = new SetAuthorisation(expectedIdToken, expectedAccessToken);
      const expected = m.cold('(b|)', { b: completion });

      m.expect(sut.initialiseAuthorisation$).toBeObservable(expected);
    }));

    it(`should emit 'Logout' when id and access token in local storage are expired`, marbles((m) => {
      makeTokenExpired();
      const expectedIdToken = 'aaa';
      const expectedAccessToken = 'aaa';
      localStorageService.getIdToken = jasmine.createSpy('get')
        .and.returnValue(expectedIdToken);
      localStorageService.getAccessToken = jasmine.createSpy('get')
        .and.returnValue(expectedAccessToken);

      const completion = new Logout();
      const expected = m.cold('(b|)', { b: completion });

      m.expect(sut.initialiseAuthorisation$).toBeObservable(expected);
    }));
  });

  describe('initialiseProfile', () => {
    it(`should emit 'SetProfile' when profile exists in local storage`, marbles((m) => {
      const expectedProfile = ineeda<Profile>();

      localStorageService.getProfile = jasmine.createSpy('get')
        .and.returnValue(expectedProfile);
      const completion = new SetProfile(expectedProfile);

      const expected = m.cold('(b|)', { b: completion });

      m.expect(sut.initialiseProfile$).toBeObservable(expected);
    }));

    it(`should not emit anything when profile doesn't exists in local storage`, marbles((m) => {
      localStorageService.getProfile = jasmine.createSpy('get')
        .and.returnValue(null);
      const action = new InitialiseProfile();

      const expected = m.cold('|');

      m.expect(sut.initialiseProfile$).toBeObservable(expected);
    }));
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorageService.removeIdToken = jasmine.createSpy('remove');
      localStorageService.removeAccessToken = jasmine.createSpy('remove');
      localStorageService.removeProfile = jasmine.createSpy('remove');
      router.navigate = jasmine.createSpy('navigate');

      actions$.stream = Observable.of(new Logout());
    });

    it(`should remove id token`, done => {
      sut.logout$
        .first()
        .finally(done)
        .subscribe(() => expect(localStorageService.removeIdToken).toHaveBeenCalled());
    });

    it(`should remove access token`, done => {
      sut.logout$
        .first()
        .finally(done)
        .subscribe(() => expect(localStorageService.removeAccessToken).toHaveBeenCalled());
    });

    it(`should remove profile token`, done => {
      sut.logout$
        .first()
        .finally(done)
        .subscribe(() => expect(localStorageService.removeProfile).toHaveBeenCalled());
    });

    it(`should redirect to login`, done => {
      sut.logout$
        .first()
        .finally(done)
        .subscribe(() => expect(router.navigate).toHaveBeenCalledWith(['/login']));
    });

    it(`should remove authorisation`, done => {
      sut.logout$
        .first()
        .finally(done)
        .subscribe(next => expect(next).toEqual(new SetAuthorisation(null, null)));
    });

    it(`should remove id token`, done => {
      sut.logout$
        .skip(1)
        .first()
        .finally(done)
        .subscribe(next => expect(next).toEqual(new SetProfile({})));
    });
  });
});
