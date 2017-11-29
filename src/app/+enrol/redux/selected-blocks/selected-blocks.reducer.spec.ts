import { selectedBlocksReducer } from './selected-blocks.reducer';
import { ineeda } from 'ineeda';
import { SelectedBlocksState } from './selected-blocks.state';
import { Actions, InitialiseSelectedBlocks, ToggleBlockSelection } from './selected-blocks.actions';

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
});
