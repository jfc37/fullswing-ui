import { getIsAuthenticated, getTopNavModel, authorisationChecks } from './user.selectors';
import { UserState } from './user.state';
import { ineeda } from 'ineeda';

describe('User State Selectors', () => {
  let state: UserState;

  beforeEach(() => {
    state = ineeda<UserState>();
  });

  function makeTokenExpired() {
    authorisationChecks.tokenNotExpired = jasmine.createSpy('expired')
      .and.returnValue(false);
  }

  function makeTokenValid() {
    authorisationChecks.tokenNotExpired = jasmine.createSpy('expired')
      .and.returnValue(true);
  }

  describe('getIsAuthenticated', () => {
    it(`should be false when state is null`, () => {
      const model = getIsAuthenticated(null);
      expect(model).toBe(false);
    });

    it(`should be false when no access token`, () => {
      state.authorisation.accessToken = null;
      const model = getIsAuthenticated(state);
      expect(model).toBe(false);
    });

    it(`should be false when no id token`, () => {
      state.authorisation.idToken = null;
      const model = getIsAuthenticated(state);
      expect(model).toBe(false);
    });

    it(`should be true when token is not expired`, () => {
      makeTokenValid();

      const model = getIsAuthenticated(state);
      expect(model).toBe(true);
    });

    it(`should be false when token is expired`, () => {
      makeTokenExpired();

      const model = getIsAuthenticated(state);
      expect(model).toBe(false);
    });
  });

  describe('getTopNavModel', () => {
    it('should be null when state is null', () => {
      const model = getTopNavModel(null);

      expect(model).toBe(null);
    });

    describe(`name`, () => {
      it(`should be name when present`, () => {
        state.profile.name = 'Joe';
        state.profile.nickname = 'joejoe';

        const model = getTopNavModel(state);

        expect(model.name).toBe(state.profile.name);
      });

      it(`should be nickname when name isn't present`, () => {
        state.profile.name = null;
        state.profile.nickname = 'joejoe';

        const model = getTopNavModel(state);

        expect(model.name).toBe(state.profile.nickname);
      });
    });

    describe(`canLogout`, () => {
      it(`should be true when user is authorised`, () => {
        makeTokenValid();

        const model = getTopNavModel(state);
        expect(model.canLogout).toBe(true);
      });

      it(`should be false when user is not authorised`, () => {
        makeTokenExpired();

        const model = getTopNavModel(state);
        expect(model.canLogout).toBe(false);
      });
    });
  });
});
