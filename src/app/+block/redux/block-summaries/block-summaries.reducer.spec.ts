import { Block } from '../../../shared/state-models/block';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { blockSummariesReducer } from './block-summaries.reducer';
import { BlockSummariesState } from './block-summaries.state';
import { Actions, LoadBlockSummariesFailure, LoadBlockSummariesRequest, LoadBlockSummariesSuccess } from './block-summaries.actions';
import { ineeda } from 'ineeda';

describe('blockSummariesReducer', () => {
  const state = ineeda<BlockSummariesState>();
  let action: Actions;

  function reduce() {
    return blockSummariesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadBlockSummariesRequest();
    });

    it('should start with empty set of blocks', () => {
      const newState = blockSummariesReducer(undefined, action);
      expect(newState.blocks).toEqual([]);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadBlockSummariesRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expected = ineeda<Block[]>();
    beforeEach(() => {
      action = new LoadBlockSummariesSuccess(expected);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set blocks', () => {
      const newState = reduce();
      expect(newState.blocks).toBe(expected);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadBlockSummariesFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
