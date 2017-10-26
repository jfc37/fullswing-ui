import { BlockSummariesState } from './block-summaries.state';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_BLOCK_SUMMARIES_FAILURE,
  LOAD_BLOCK_SUMMARIES_REQUEST,
  LOAD_BLOCK_SUMMARIES_SUCCESS,
  RESET_BLOCK_SUMMARIES,
} from './block-summaries.actions';

function getInitialState(): BlockSummariesState {
  return {
    ...getInitialLoadableState(),
    blocks: {}
  };
}

export function blockSummariesReducer(state = getInitialState(), action: Actions): BlockSummariesState {
  switch (action.type) {
    case RESET_BLOCK_SUMMARIES:
      return getInitialState();

    case LOAD_BLOCK_SUMMARIES_REQUEST:
      return getLoadingState(state);

    case LOAD_BLOCK_SUMMARIES_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { blocks: action.blocks.reduce((accum, block) => Object.assign({}, accum, {[block.id]: block}), {}) }
      );

    case LOAD_BLOCK_SUMMARIES_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
