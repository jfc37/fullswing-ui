import { selectedBlocksReducer } from './selected-blocks.reducer';
import { ineeda } from 'ineeda';
import { SelectedBlocksState } from './selected-blocks.state';
import {
  Actions,
  EnrolInSelectedBlocksFailure,
  EnrolInSelectedBlocksRequest,
  EnrolInSelectedBlocksSuccess,
  InitialiseSelectedBlocks,
  ToggleBlockSelection,
} from './selected-blocks.actions';
import { getSavingState, getSaveSuccessState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';

describe('selectedBlocksReducer', () => {
  const state = ineeda<SelectedBlocksState>();
  let action: Actions;

  function reduce() {
    return selectedBlocksReducer(state, action);
  }

  describe('Initialise Selected Blocks', () => {
    beforeEach(() => {
      action = new InitialiseSelectedBlocks();
    });

    it('should reset blocks', () => {
      state.blocks = { [1]: true };
      const newState = reduce();
      expect(newState.blocks[1]).toBeUndefined();
    });
  });

  describe(`Toggle Block Selection`, () => {
    const id = 334;

    beforeEach(() => {
      action = new ToggleBlockSelection(id);
    });

    it(`should set block id to true when it hasn't been set before`, () => {
      state.blocks[id] = undefined;

      const newState = reduce();
      expect(newState.blocks[id]).toBe(true);
    });

    it(`should set block id to false when it is originally true`, () => {
      state.blocks[id] = true;

      const newState = reduce();
      expect(newState.blocks[id]).toBe(false);
    });

    it(`should set block id to true when it is originally false`, () => {
      state.blocks[id] = false;

      const newState = reduce();
      expect(newState.blocks[id]).toBe(true);
    });
  });

  describe('Enrol Request', () => {
    beforeEach(() => {
      action = new EnrolInSelectedBlocksRequest();
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSavingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Enrol Success', () => {
    beforeEach(() => {
      action = new EnrolInSelectedBlocksSuccess();
    });

    it('should set state according to saving success state', () => {
      const newState = reduce();
      const expectedState = getSaveSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set reset selected blocks', () => {
      state.blocks = {[1]: true};

      const newState = reduce();

      expect(newState.blocks).toEqual({});
    });
  });

  describe('Enrol Failure', () => {
    const error = 'ERROR';

    beforeEach(() => {
      action = new EnrolInSelectedBlocksFailure(error);
    });

    it('should set state according to saving failure state', () => {
      const newState = reduce();
      const expectedState = getSaveFailureState(null, error);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
