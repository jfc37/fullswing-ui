import { CurrentStudentState } from './current-student.state';
import {
  Actions, SET_CURRENT_STUDENT,
} from './current-student.actions';

function getInitialState(): CurrentStudentState {
  return {
    currentStudentId: null,
  };
}

export function currentStudentReducer(state = getInitialState(), action: Actions): CurrentStudentState {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        currentStudentId: action.studentId,
      };

    default:
      return state;
  }
}
