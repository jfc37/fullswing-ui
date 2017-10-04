import { UserState } from '../../../core/redux/user/user.state';
import { AuthResult, AuthSetup, ProfileResult } from '../../services/auth-setup.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { AuthoriseContainerDispatcher } from './authorise.container.dispatcher';
import { Store } from '@ngrx/store';
import { marbles, Context } from 'rxjs-marbles';
import { SetAuthorisation, SetProfile } from '../../../core/redux/user/user.actions';
import { ineeda } from 'ineeda';
import { LocalStorageService } from '../../../core/service/local-storage.service';

describe('AuthoriseContainerDispatcher', () => {
  let sut: AuthoriseContainerDispatcher;
  let authSetup: AuthSetup;
  let store: Store<UserState>;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthoriseContainerDispatcher,
        { provide: Store, useValue: {} },
        { provide: AuthSetup, useValue: {} },
        { provide: LocalStorageService, useValue: {} },
      ]
    });

    authSetup = TestBed.get(AuthSetup);
    store = TestBed.get(Store);
    localStorageService = TestBed.get(LocalStorageService);

    sut = TestBed.get(AuthoriseContainerDispatcher);
  });

  it('should exist', () => {
    expect(sut).toBeTruthy();
  });

  describe('completeAuthorisation', () => {
    let authResult: AuthResult;
    let profileResult: ProfileResult;
    let authMarble: string;
    let profileMarble: string;
    let expectedMarble: string;

    beforeEach(() => {
      store.dispatch = jasmine.createSpy('dispatch');
      localStorageService.setIdToken = jasmine.createSpy('setIdToken');
      localStorageService.setAccessToken = jasmine.createSpy('setAccessToken');
      localStorageService.setProfile = jasmine.createSpy('setProfile');

      profileResult = ineeda<ProfileResult>({ claims: [{ resource: 'admin' }] });
      authResult = ineeda<AuthResult>({ idToken: 'a', accessToken: 'b' });
    });

    function setupMarbles(m: Context) {
      const authSource = m.cold(authMarble, { a: authResult });
      const profileSource = m.cold(profileMarble, { a: profileResult });

      authSetup.getAuthResult = jasmine.createSpy('auth')
        .and.returnValue(authSource);

      authSetup.getProfileResult = jasmine.createSpy('profile')
        .and.returnValue(profileSource);
    }

    function validateMarbles(m: Context) {
      const expected = m.cold(expectedMarble, { a: null });

      m.expect(sut.completeAuthorisation()).toBeObservable(expected);
    }

    it('should emit when auth result and profile result emit', marbles((m) => {
      authMarble = '-a---|';
      profileMarble = '---a-|';
      expectedMarble = '---(a|)';

      setupMarbles(m);
      validateMarbles(m);
    }));

    it(`should not emit when auth result hasn't emitted`, marbles((m) => {
      authMarble = '-----';
      profileMarble = '---a-|';
      expectedMarble = '-----';

      setupMarbles(m);
      validateMarbles(m);
    }));

    it(`should not emit when profile result hasn't emitted`, marbles((m) => {
      authMarble = '-a---';
      profileMarble = '-----';
      expectedMarble = '-----';

      setupMarbles(m);
      validateMarbles(m);
    }));

    describe(`when authorisation is complete`, () => {
      function runMarbles(m: Context) {
        authMarble = '-a---|';
        profileMarble = '---a-|';
        expectedMarble = '---(a|)';

        setupMarbles(m);
      }

      it(`should set authorisation`, marbles((m) => {
        runMarbles(m);

        sut.completeAuthorisation()
          .subscribe(() => expect(store.dispatch).toHaveBeenCalledWith(new SetAuthorisation(authResult.idToken, authResult.accessToken)));
      }));

      it(`should store id token in local storage`, marbles((m) => {
        runMarbles(m);

        sut.completeAuthorisation()
          .subscribe(() => expect(localStorageService.setIdToken).toHaveBeenCalledWith(authResult.idToken));
      }));

      it(`should store access token in local storage`, marbles((m) => {
        runMarbles(m);

        sut.completeAuthorisation()
          .subscribe(() => expect(localStorageService.setAccessToken).toHaveBeenCalledWith(authResult.accessToken));
      }));

      it(`should set profile`, marbles((m) => {
        runMarbles(m);

        const expectedProfile = {
          email: profileResult.email,
          name: profileResult.name,
          nickname: profileResult.nickname,
          claims: [...profileResult.claims].map(claim => claim.resource)
        };

        sut.completeAuthorisation()
          .subscribe(() => expect(store.dispatch).toHaveBeenCalledWith(new SetProfile(expectedProfile)));
      }));

      it(`should store profile in local storage`, marbles((m) => {
        runMarbles(m);

        const expectedProfile = {
          email: profileResult.email,
          name: profileResult.name,
          nickname: profileResult.nickname,
          claims: [...profileResult.claims].map(claim => claim.resource)
        };

        sut.completeAuthorisation()
          .subscribe(() => expect(localStorageService.setProfile).toHaveBeenCalledWith(expectedProfile));
      }));
    });
  });
});
