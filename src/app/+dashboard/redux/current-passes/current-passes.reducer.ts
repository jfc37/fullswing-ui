import { CurrentPassesState } from './current-passes.state';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_CURRENT_PASSES_FAILURE,
  LOAD_CURRENT_PASSES_REQUEST,
  LOAD_CURRENT_PASSES_SUCCESS,
} from './current-passes.actions';

function getInitialState(): CurrentPassesState {
  return {
    ...getInitialLoadableState(),
    passes: []
  };
}

export function currentPassesReducer(state = getInitialState(), action: Actions): CurrentPassesState {
  switch (action.type) {
    case LOAD_CURRENT_PASSES_REQUEST:
      return getLoadingState(state);

    case LOAD_CURRENT_PASSES_SUCCESS:
      return Object.assign({}, getLoadSuccessState(state), { passes: action.passes });

    case LOAD_CURRENT_PASSES_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
