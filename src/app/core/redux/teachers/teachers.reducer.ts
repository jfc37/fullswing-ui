import { TeachersState } from './teachers.state';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_TEACHERS_FAILURE,
  LOAD_TEACHERS_REQUEST,
  LOAD_TEACHERS_SUCCESS,
} from './teachers.actions';

function getInitialState(): TeachersState {
  return {
    ...getInitialLoadableState(),
    teachers: []
  };
}

export function teachersReducer(state = getInitialState(), action: Actions): TeachersState {
  switch (action.type) {
    case LOAD_TEACHERS_REQUEST:
      return getLoadingState(state);

    case LOAD_TEACHERS_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { teachers: action.teachers.reduce((accum, teacher) => Object.assign({}, accum, { [teacher.id]: teacher }), {}) });

    case LOAD_TEACHERS_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
