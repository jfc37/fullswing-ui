import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import { ClassesState } from './classes.state';
import {
  Actions,
  CHECK_IN_SUCCESS,
  LOAD_CLASS_FAILURE,
  LOAD_CLASS_REQUEST,
  LOAD_CLASS_SUCCESS,
  REMOVE_STUDENT_SUCCESS,
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

    case CHECK_IN_SUCCESS: {
      const currentClass = state.classes[state.selectedId];
      const updatedClass = {
        ...currentClass,
        actualStudentIds: [
          ...currentClass.actualStudentIds,
          action.studentId,
        ]
      };
      return Object.assign(
        {},
        { ...state },
        { classes: { ...state.classes, [state.selectedId]: updatedClass } }
      );
    }

    case REMOVE_STUDENT_SUCCESS: {
      const currentClass = state.classes[state.selectedId];
      const updatedClass = {
        ...currentClass,
        actualStudentIds: currentClass.actualStudentIds.filter(id => id !== action.studentId)
      };
      return Object.assign(
        {},
        { ...state },
        { classes: { ...state.classes, [state.selectedId]: updatedClass } }
      );
    }

    default:
      return state;
  }
}
