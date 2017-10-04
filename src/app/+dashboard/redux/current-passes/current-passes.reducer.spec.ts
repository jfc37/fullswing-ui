import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { currentPassesReducer } from './current-passes.reducer';
import { CurrentPassesState } from './current-passes.state';
import { Actions, LoadCurrentPassesFailure, LoadCurrentPassesRequest, LoadCurrentPassesSuccess } from './current-passes.actions';
import { ineeda } from 'ineeda';
import { Pass } from '../../../shared/state-models/pass';

describe('currentPassesReducer', () => {
  const state = ineeda<CurrentPassesState>();
  let action: Actions;

  function reduce() {
    return currentPassesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadCurrentPassesRequest();
    });

    it('should start with empty set of passes', () => {
      const newState = currentPassesReducer(undefined, action);
      expect(newState.passes).toEqual([]);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadCurrentPassesRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expectedPasses = ineeda<Pass[]>();
    beforeEach(() => {
      action = new LoadCurrentPassesSuccess(expectedPasses);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set passes', () => {
      const newState = reduce();
      expect(newState.passes).toBe(expectedPasses);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadCurrentPassesFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
