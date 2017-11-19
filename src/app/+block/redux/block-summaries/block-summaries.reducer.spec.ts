import { DeletableState } from '../../../shared/redux/deletable/deletable.state';
import { Block } from '../../../shared/state-models/block';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { blockSummariesReducer } from './block-summaries.reducer';
import { BlockSummariesState } from './block-summaries.state';
import {
  Actions,
  LoadBlockSummariesFailure,
  LoadBlockSummariesRequest,
  LoadBlockSummariesSuccess,
  ResetBlockSummaries,
  DeleteBlockSummariesRequest,
  DeleteBlockSummariesSuccess,
  DeleteBlockSummariesFailure,
} from './block-summaries.actions';
import { ineeda } from 'ineeda';
import { getDeletingState, getDeleteSuccessState, getDeleteFailureState } from '../../../shared/redux/deletable/deletable.reducer';

describe('blockSummariesReducer', () => {
  const state = ineeda<BlockSummariesState>({deleteError: {}, isDeleting: {}});
  const id = 1;
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
      expect(newState.blocks).toEqual({});
    });
  });

  describe('Reset', () => {
    beforeEach(() => {
      action = new ResetBlockSummaries();
    });

    it('should set as initial state', () => {
      const newState = reduce();
      const expectedState = blockSummariesReducer(undefined, action);
      expect(newState).toEqual(expectedState);
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
    const expectedBlock = ineeda<Block>({ id: 300 });

    beforeEach(() => {
      action = new LoadBlockSummariesSuccess([expectedBlock]);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set blocks', () => {
      const newState = reduce();
      expect(newState.blocks[expectedBlock.id]).toBe(expectedBlock);
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

  describe('Delete Request', () => {
    beforeEach(() => {
      action = new DeleteBlockSummariesRequest(id);
    });

    it('should set state according to deleting state', () => {
      const newState = reduce();
      const expectedState = getDeletingState(state, id);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toEqual(expectedState[k]));
    });
  });

  describe('Delete Success', () => {
    const blockToDelete = ineeda<Block>({ id });

    beforeEach(() => {
      action = new DeleteBlockSummariesSuccess(blockToDelete.id);
    });

    it('should set state according to delete success state', () => {
      const newState = reduce();
      const expectedState = getDeleteSuccessState({deleteError: {}, isDeleting: {}}, id);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toEqual(expectedState[k]));
    });

    it('should remove block', () => {
      state.blocks = {
        [blockToDelete.id]: blockToDelete
      };
      const newState = reduce();
      expect(newState.blocks[blockToDelete.id]).toBeFalsy();
    });

    it('should not remove block not deleted', () => {
      state.blocks = {
        10: ineeda<Block>()
      };
      const newState = reduce();
      expect(newState.blocks['10']).toBeTruthy();
    });
  });

  describe('Delete Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new DeleteBlockSummariesFailure(id, expectedError);
    });

    it('should set state according to delete failure state', () => {
      const newState = reduce();
      const expectedState = getDeleteFailureState({deleteError: {}, isDeleting: {}}, id, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toEqual(expectedState[k]));
    });
  });
});
