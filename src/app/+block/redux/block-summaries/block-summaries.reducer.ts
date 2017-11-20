import { BlockSummariesState } from './block-summaries.state';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  ADD_BLOCK_SUMMARIES,
  DELETE_BLOCK_SUMMARIES_FAILURE,
  DELETE_BLOCK_SUMMARIES_REQUEST,
  DELETE_BLOCK_SUMMARIES_SUCCESS,
  GENERATE_BLOCK_SUMMARIES_FAILURE,
  GENERATE_BLOCK_SUMMARIES_REQUEST,
  GENERATE_BLOCK_SUMMARIES_SUCCESS,
  LOAD_BLOCK_SUMMARIES_FAILURE,
  LOAD_BLOCK_SUMMARIES_REQUEST,
  LOAD_BLOCK_SUMMARIES_SUCCESS,
  RESET_BLOCK_SUMMARIES,
} from './block-summaries.actions';
import { getInitialDeletableState, getDeletingState, getDeleteSuccessState, getDeleteFailureState } from '../../../shared/redux/deletable/deletable.reducer';

function getInitialState(): BlockSummariesState {
  return {
    ...getInitialLoadableState(),
    ...getInitialDeletableState(),
    blocks: {},
    isGenerating: {},
    generateError: {},
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

    case ADD_BLOCK_SUMMARIES:
      return Object.assign({}, state, {
        blocks: Object.assign({}, state.blocks, { [action.block.id]: action.block })
      });

    case GENERATE_BLOCK_SUMMARIES_REQUEST:
      return Object.assign({}, state, {
        isGenerating: Object.assign({}, state.isGenerating, { [action.id]: true }),
        generateError: Object.assign({}, state.generateError, { [action.id]: null }),
      });

    case GENERATE_BLOCK_SUMMARIES_SUCCESS:
      return Object.assign({}, state, {
        isGenerating: Object.assign({}, state.isGenerating, { [action.id]: false }),
        generateError: Object.assign({}, state.generateError, { [action.id]: null }),
      });

    case GENERATE_BLOCK_SUMMARIES_FAILURE:
      return Object.assign({}, state, {
        isGenerating: Object.assign({}, state.isGenerating, { [action.id]: false }),
        generateError: Object.assign({}, state.generateError, { [action.id]: action.error }),
      });

    default:
      return state;
  }
}
