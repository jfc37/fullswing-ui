import { getInitialSavableState, getSavingState, getSaveSuccessState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';
import { NewStudentState } from './new-student.state';
import { Actions, RESET, SET_STUDENT, CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAILURE } from './new-student.actions';


function getInitialState(): NewStudentState {
  return {
    ...getInitialSavableState(),
    student: {
      firstName: null,
      surname: null,
      email: null,
      password: null,
    }
  };
}

export function newStudentReducer(state = getInitialState(), action: Actions): NewStudentState {
  switch (action.type) {
    case RESET: {
      return getInitialState();
    }

    case SET_STUDENT:
      return {
        ...state,
        student: action.student,
      };

    case CREATE_STUDENT_REQUEST:
      return getSavingState(state);

    case CREATE_STUDENT_SUCCESS:
      return getSaveSuccessState(state);

    case CREATE_STUDENT_FAILURE:
      return getSaveFailureState(state, action.error);

    default:
      return state;
  }
}
