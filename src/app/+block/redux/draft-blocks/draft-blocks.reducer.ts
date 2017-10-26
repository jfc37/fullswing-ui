import { getInitialSavableState, getSaveSuccessState, getSavingState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_DRAFT_BLOCK_FAILURE,
  LOAD_DRAFT_BLOCK_REQUEST,
  LOAD_DRAFT_BLOCK_SUCCESS,
  RESET_DRAFT_BLOCK,
  SAVE_SELECTED_DRAFT_BLOCK_FAILURE,
  SAVE_SELECTED_DRAFT_BLOCK_REQUEST,
  SAVE_SELECTED_DRAFT_BLOCK_SUCCESS,
  SET_SELECTED_DRAFT_BLOCK_ID,
  UPDATE_SELECTED_DRAFT_BLOCK,
} from './draft-blocks.actions';
import { DraftBlocksState } from './draft-blocks.state';

function getInitialState(): DraftBlocksState {
  return {
    ...getInitialLoadableState(),
    ...getInitialSavableState(),
    blocks: {}
  };
}

export function draftBlocksReducer(state = getInitialState(), action: Actions): DraftBlocksState {
  switch (action.type) {
    case RESET_DRAFT_BLOCK:
      return getInitialState();

    case SET_SELECTED_DRAFT_BLOCK_ID:
      return {
        ...state,
        selectedId: action.id
      };

    case LOAD_DRAFT_BLOCK_REQUEST:
      return getLoadingState(state);

    case LOAD_DRAFT_BLOCK_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { blocks: { ...state.blocks, [action.block.id]: action.block } }
      );

    case LOAD_DRAFT_BLOCK_FAILURE:
      return getLoadFailureState(state, action.error);

    case UPDATE_SELECTED_DRAFT_BLOCK:
      return Object.assign(
        {},
        state,
        { blocks: { ...state.blocks, [state.selectedId]: { ...state.blocks[state.selectedId], ...action.block} } }
      );

    case SAVE_SELECTED_DRAFT_BLOCK_REQUEST:
      return getSavingState(state);

    case SAVE_SELECTED_DRAFT_BLOCK_SUCCESS:
      return getSaveSuccessState(state);

    case SAVE_SELECTED_DRAFT_BLOCK_FAILURE:
      return getSaveFailureState(state, action.error);

    default:
      return state;
  }
}
