import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_PASSES_FAILURE,
  LOAD_PASSES_REQUEST,
  LOAD_PASSES_SUCCESS,
  SET_PASSES_FOR_STUDENT,
} from './passes.actions';
import { PassesState } from './passes.state';

function getInitialState(): PassesState {
  return {
    ...getInitialLoadableState(),
    passes: {}
  };
}

export function passesReducer(state = getInitialState(), action: Actions): PassesState {
  switch (action.type) {
    case LOAD_PASSES_REQUEST:
      return getLoadingState(state);

    case LOAD_PASSES_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
      );

    case LOAD_PASSES_FAILURE:
      return getLoadFailureState(state, action.error);

    case SET_PASSES_FOR_STUDENT: {
      return Object.assign(
        {},
        state,
        { passes: { ...state.passes, [action.studentId]: action.passes } }
      );
    }

    default:
      return state;
  }
}
