import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import { ClassesState } from './classes.state';
import {
  Actions,
  ADD_STUDENT_TO_ATTENDANCE,
  LOAD_CLASS_FAILURE,
  LOAD_CLASS_REQUEST,
  LOAD_CLASS_SUCCESS,
  REMOVE_STUDENT_FROM_ATTENDANCE,
} from './classes.actions';

function getInitialState(): ClassesState {
  return {
    classes: {},
    ...getInitialLoadableState()
  };
}

export function classesReducer(state = getInitialState(), action: Actions): ClassesState {
  switch (action.type) {
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

    case ADD_STUDENT_TO_ATTENDANCE: {
      const currentClass = state.classes[action.classId];
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
        { classes: { ...state.classes, [action.classId]: updatedClass } }
      );
    }

    case REMOVE_STUDENT_FROM_ATTENDANCE: {
      const currentClass = state.classes[action.classId];
      const updatedClass = {
        ...currentClass,
        actualStudentIds: currentClass.actualStudentIds.filter(id => id !== action.studentId)
      };
      return Object.assign(
        {},
        { ...state },
        { classes: { ...state.classes, [action.classId]: updatedClass } }
      );
    }

    default:
      return state;
  }
}
