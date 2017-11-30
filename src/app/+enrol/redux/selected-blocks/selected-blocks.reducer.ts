import { SelectedBlocksState } from './selected-blocks.state';
import {
  Actions,
  ENROL_IN_SELECTED_BLOCKS_FAILURE,
  ENROL_IN_SELECTED_BLOCKS_REQUEST,
  ENROL_IN_SELECTED_BLOCKS_SUCCESS,
  INITIALISE_SELECTED_BLOCKS,
  TOGGLE_BLOCK_SELECTION,
} from './selected-blocks.actions';
import { getInitialSavableState, getSavingState, getSaveSuccessState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';

function getInitialState(): SelectedBlocksState {
  return {
    blocks: {},
    ...getInitialSavableState<SelectedBlocksState>()
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

    case ENROL_IN_SELECTED_BLOCKS_REQUEST:
      return getSavingState(state);

    case ENROL_IN_SELECTED_BLOCKS_SUCCESS:
      return {
        ...getSaveSuccessState(state),
        blocks: {},
      };

    case ENROL_IN_SELECTED_BLOCKS_FAILURE:
      return getSaveFailureState(state, action.error);

    default:
      return state;
  }
}
