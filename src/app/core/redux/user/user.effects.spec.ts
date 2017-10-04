import { InitialiseProfile, SetAuthorisation, SetProfile } from './user.actions';
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

describe('UserEffects', () => {
  let sut: UserEffects;

  let actions$: TestActions;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        { provide: Actions, useFactory: getActions },
        { provide: LocalStorageService, useValue: {} },
      ],
    });

    sut = TestBed.get(UserEffects);
    localStorageService = TestBed.get(LocalStorageService);
    actions$ = TestBed.get(Actions);

    localStorageService.getIdToken = jasmine.createSpy('get')
      .and.returnValue(null);
    localStorageService.getAccessToken = jasmine.createSpy('getAccessToken')
      .and.returnValue(null);
    localStorageService.getProfile = jasmine.createSpy('getProfile')
      .and.returnValue(null);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('initialiseAuthorisation', () => {
    it(`should emit 'SetAuthorisation' when id token exists in local storage`, marbles((m) => {
      const expectedIdToken = 'aaa';
      localStorageService.getIdToken = jasmine.createSpy('get')
        .and.returnValue(expectedIdToken);

      const completion = new SetAuthorisation(expectedIdToken, null);
      const expected = m.cold('(b|)', { b: completion });

      m.expect(sut.initialiseAuthorisation$).toBeObservable(expected);
    }));

    it(`should emit 'SetAuthorisation' when access token exists in local storage`, marbles((m) => {
      const expectedAccessToken = 'aaa';
      localStorageService.getAccessToken = jasmine.createSpy('get')
        .and.returnValue(expectedAccessToken);

      const completion = new SetAuthorisation(null, expectedAccessToken);
      const expected = m.cold('(b|)', { b: completion });

      m.expect(sut.initialiseAuthorisation$).toBeObservable(expected);
    }));

    it(`should emit empty 'SetAuthorisation' when no tokens exists in local storage`, marbles((m) => {
      const completion = new SetAuthorisation(null, null);
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
});
