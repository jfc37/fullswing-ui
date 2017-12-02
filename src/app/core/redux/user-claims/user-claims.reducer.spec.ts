import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { userClaimsReducer } from './user-claims.reducer';
import { UserClaimsState } from './user-claims.state';
import { Actions, LoadClaimsFailure, LoadClaimsRequest, LoadClaimsSuccess } from './user-claims.actions';
import { ineeda } from 'ineeda';

describe('userClaimsReducer', () => {
  const state = ineeda<UserClaimsState>();
  let action: Actions;

  function reduce() {
    return userClaimsReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadClaimsRequest();
    });

    it('should start with empty set of claims', () => {
      const newState = userClaimsReducer(undefined, action);
      expect(newState.claims).toEqual([]);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadClaimsRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expected = ineeda<string[]>();
    beforeEach(() => {
      action = new LoadClaimsSuccess(expected);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set claims', () => {
      const newState = reduce();
      expect(newState.claims).toBe(expected);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadClaimsFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
