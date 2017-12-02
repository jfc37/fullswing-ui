import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import { ClassesState } from './classes.state';
import {
  Actions,
  LOAD_CLASS_FAILURE,
  LOAD_CLASS_REQUEST,
  LOAD_CLASS_SUCCESS,
  SET_SELECTED_CLASS_ID,
} from './classes.actions';

function getInitialState(): ClassesState {
  return {
    selectedId: null,
    classes: {},
    ...getInitialLoadableState()
  };
}

export function classesReducer(state = getInitialState(), action: Actions): ClassesState {
  switch (action.type) {
    case SET_SELECTED_CLASS_ID:
      return {
        ...state,
        selectedId: action.id
      };

    case LOAD_CLASS_REQUEST:
      return getLoadingState(state);

    case LOAD_CLASS_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { classes: { ...state.classes, [action.selectedClass.id]: action.selectedClass } }
      );

    case LOAD_CLASS_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
