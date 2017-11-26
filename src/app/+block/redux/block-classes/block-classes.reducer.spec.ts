import { BlockClassesState } from './block-classes.state';
import { Actions, LoadBlockClassesRequest, SetSelectedBlockId, LoadBlockClassesSuccess, LoadBlockClassesFailure } from './block-classes.actions';
import { ineeda } from 'ineeda';
import { blockClassesReducer } from './block-classes.reducer';
import { getLoadingState, getLoadSuccessState, getLoadFailureState } from '../../../shared/redux/loadable/loadable.reducer';

describe('blockClassesReducer', () => {
  const state = ineeda<BlockClassesState>();
  let action: Actions;

  function reduce() {
    return blockClassesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new SetSelectedBlockId(122);
    });

    it(`should set blocks to empty object`, () => {
      const newState = blockClassesReducer(undefined, action);
      expect(newState.classes).toEqual({});
    });
  });

  describe('Set Selected Draft Block Id', () => {
    const expectedId = 122;
    beforeEach(() => {
      action = new SetSelectedBlockId(expectedId);
    });

    it('should set selected id', () => {
      const newState = reduce();
      expect(newState.selectedBlockId).toBe(expectedId);
    });
  });

  describe('Load Request', () => {
    const blockId = 534;
    beforeEach(() => {
      action = new LoadBlockClassesRequest(blockId);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const classIds = [174, 534, 532];
    const blockId = 8864;

    beforeEach(() => {
      action = new LoadBlockClassesSuccess(blockId, classIds);
    });

    it('should set state according to loading success state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set classes to block id', () => {
      const newState = reduce();
      expect(newState.classes[blockId]).toBe(classIds);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadBlockClassesFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
