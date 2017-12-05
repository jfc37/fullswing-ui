import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { passesReducer } from './passes.reducer';
import { PassesState } from './passes.state';
import { Actions, LoadPassesFailure, LoadPassesRequest, LoadPassesSuccess } from './passes.actions';
import { ineeda } from 'ineeda';
import { Pass } from '../../../shared/state-models/pass';

describe('passesReducer', () => {
  const state = ineeda<PassesState>();
  let action: Actions;

  function reduce() {
    return passesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadPassesRequest(null);
    });

    it('should start with empty passes object', () => {
      const newState = passesReducer(undefined, action);
      expect(newState.passes).toEqual({});
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadPassesRequest(1);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const studentId = 521;
    const passes = ineeda<Pass[]>();
    beforeEach(() => {
      action = new LoadPassesSuccess(studentId, passes);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set passes', () => {
      const newState = reduce();
      expect(newState.passes[studentId]).toBe(passes);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadPassesFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
