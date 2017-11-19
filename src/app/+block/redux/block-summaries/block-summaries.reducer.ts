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
  DELETE_BLOCK_SUMMARIES_REQUEST,
  DELETE_BLOCK_SUMMARIES_SUCCESS,
  DELETE_BLOCK_SUMMARIES_FAILURE,
} from './block-summaries.actions';
import { getInitialDeletableState, getDeletingState, getDeleteSuccessState, getDeleteFailureState } from '../../../shared/redux/deletable/deletable.reducer';

function getInitialState(): BlockSummariesState {
  return {
    ...getInitialLoadableState(),
    ...getInitialDeletableState(),
    blocks: {}
  };
}

export function blockSummariesReducer(state = getInitialState(), action: Actions): BlockSummariesState {
  switch (action.type) {
    case RESET_BLOCK_SUMMARIES:
      return getInitialState();

    case LOAD_BLOCK_SUMMARIES_REQUEST:
      return getLoadingState(state);

    case LOAD_BLOCK_SUMMARIES_SUCCESS: {
      const blocks = action.blocks.reduce((accum, block) => Object.assign({}, accum, { [block.id]: block }), {});
      return Object.assign({}, getLoadSuccessState(state), { blocks });
    }

    case LOAD_BLOCK_SUMMARIES_FAILURE:
      return getLoadFailureState(state, action.error);

    case DELETE_BLOCK_SUMMARIES_REQUEST:
      return getDeletingState(state, action.id);

    case DELETE_BLOCK_SUMMARIES_SUCCESS: {
      const blocks = Object.keys(state.blocks)
        .filter(id => Number(id) !== action.id)
        .reduce((accum, id) => Object.assign({}, accum, { [id]: state.blocks[id] }), {});

      return Object.assign({}, getDeleteSuccessState(state, action.id), { blocks });
    }

    case DELETE_BLOCK_SUMMARIES_FAILURE:
      return getDeleteFailureState(state, action.id, action.error);

    default:
      return state;
  }
}
