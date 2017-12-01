import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_ENROLABLE_BLOCKS_FAILURE,
  LOAD_ENROLABLE_BLOCKS_REQUEST,
  LOAD_ENROLABLE_BLOCKS_SUCCESS,
  RESET_ENROLABLE_BLOCKS,
} from './enrolable-blocks.actions';
import { EnrolableBlocksState } from './enrolable-blocks.state';

function getInitialState(): EnrolableBlocksState {
  return {
    ...getInitialLoadableState(),
    blocks: {}
  };
}

export function enrolableBlocksReducer(state = getInitialState(), action: Actions): EnrolableBlocksState {
  switch (action.type) {
    case RESET_ENROLABLE_BLOCKS:
      return getInitialState();

    case LOAD_ENROLABLE_BLOCKS_REQUEST:
      return getLoadingState(state);

    case LOAD_ENROLABLE_BLOCKS_SUCCESS:
      const blocks = action.blocks.reduce((accum, block) => Object.assign({}, accum, { [block.id]: block }), {});
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { blocks }
      );

    case LOAD_ENROLABLE_BLOCKS_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
