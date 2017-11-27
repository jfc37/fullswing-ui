import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { enrolableBlocksReducer } from './enrolable-blocks.reducer';
import { EnrolableBlocksState, EnrolableBlock } from './enrolable-blocks.state';
import { Actions, LoadEnrolableBlocksFailure, LoadEnrolableBlocksRequest, LoadEnrolableBlocksSuccess } from './enrolable-blocks.actions';
import { ineeda } from 'ineeda';

describe('enrolableBlocksReducer', () => {
  const state = ineeda<EnrolableBlocksState>();
  let action: Actions;

  function reduce() {
    return enrolableBlocksReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadEnrolableBlocksRequest();
    });

    it('should start with empty set of blocks', () => {
      const newState = enrolableBlocksReducer(undefined, action);
      expect(newState.blocks).toEqual({});
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadEnrolableBlocksRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expected = [ineeda<EnrolableBlock>({id: 1})];

    beforeEach(() => {
      action = new LoadEnrolableBlocksSuccess(expected);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set blocks', () => {
      const newState = reduce();
      expect(newState.blocks).toEqual({[1]: expected[0]});
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadEnrolableBlocksFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
