import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { draftBlocksReducer } from './draft-blocks.reducer';
import { DraftBlocksState } from './draft-blocks.state';
import {
  Actions,
  LoadDraftBlockFailure,
  LoadDraftBlockRequest,
  LoadDraftBlockSuccess,
  ResetDraftBlock,
  SaveSelectedDraftBlockFailure,
  SaveSelectedDraftBlockRequest,
  SaveSelectedDraftBlockSuccess,
  SetSelectedDraftBlockId,
  UpdateSelectedDraftBlock,
} from './draft-blocks.actions';
import { ineeda } from 'ineeda';
import { Block } from '../../../shared/state-models/block';
import { getSavingState, getSaveSuccessState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';

describe('draftBlocksReducer', () => {
  const state = ineeda<DraftBlocksState>();
  let action: Actions;

  function reduce() {
    return draftBlocksReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadDraftBlockRequest(122);
    });

    it('should start with empty set of blocks', () => {
      const newState = draftBlocksReducer(undefined, action);
      expect(newState.blocks).toEqual({});
    });
  });

  describe('Reset Draft Block', () => {
    beforeEach(() => {
      action = new ResetDraftBlock();
    });

    it('should clear selected id', () => {
      const newState = reduce();
      expect(newState.selectedId).toBeFalsy();
    });

    it('should clear loading state', () => {
      state.hasLoaded = true;
      state.loadError = 'ERROR';
      state.isLoading = true;

      const newState = reduce();

      expect(newState.hasLoaded).toBe(false);
      expect(newState.loadError).toBeFalsy();
      expect(newState.isLoading).toBe(false);
    });
  });

  describe('Set Selected Draft Block Id', () => {
    const expectedId = 122;
    beforeEach(() => {
      action = new SetSelectedDraftBlockId(expectedId);
    });

    it('should set selected id', () => {
      const newState = reduce();
      expect(newState.selectedId).toBe(expectedId);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadDraftBlockRequest(122);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expectedId = 543;
    const expected = ineeda<Block>({ id: expectedId });
    beforeEach(() => {
      action = new LoadDraftBlockSuccess(expected);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set blocks', () => {
      const newState = reduce();
      expect(newState.blocks[expectedId]).toBe(expected);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadDraftBlockFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Update Selected Draft Block', () => {
    const expectedId = 543;

    beforeEach(() => {
      state.selectedId = expectedId;
      state.blocks[expectedId] = {} as Block;
    });

    it('should update supplied selected block properties', () => {
      const expectedName = 'new name';
      const block = ineeda<Block>({ id: expectedId, name: expectedName });
      action = new UpdateSelectedDraftBlock(block);

      const newState = reduce();
      expect(newState.blocks[expectedId].name).toBe(expectedName);
    });

    it('should keep unsupplied selected block properties', () => {
      const expectedName = 'old name';
      state.blocks[expectedId].name = expectedName;
      const block = ineeda<Block>({ id: expectedId });
      action = new UpdateSelectedDraftBlock(block);

      const newState = reduce();
      expect(newState.blocks[expectedId].name).toBe(expectedName);
    });
  });

  describe('Save Request', () => {
    beforeEach(() => {
      action = new SaveSelectedDraftBlockRequest();
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSavingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Save Success', () => {
    beforeEach(() => {
      action = new SaveSelectedDraftBlockSuccess();
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSaveSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Save Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new SaveSelectedDraftBlockFailure(expectedError);
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSaveFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
