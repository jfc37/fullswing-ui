import { SelectedBlocksState } from './selected-blocks.state';
import { Actions, INITIALISE_SELECTED_BLOCKS, TOGGLE_BLOCK_SELECTION } from './selected-blocks.actions';


function getInitialState(): SelectedBlocksState {
  return {
    blocks: {}
  };
}

export function selectedBlocksReducer(state = getInitialState(), action: Actions): SelectedBlocksState {
  switch (action.type) {
    case INITIALISE_SELECTED_BLOCKS:
      return getInitialState();

    case TOGGLE_BLOCK_SELECTION:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          [action.id]: !state.blocks[action.id]
        }
      };

    default:
      return state;
  }
}
