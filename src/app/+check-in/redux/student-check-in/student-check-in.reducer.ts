import { StudentCheckInState } from './student-check-in.state';
import { Actions, RESET, SET_STUDENT } from './student-check-in.actions';

function getInitialState(): StudentCheckInState {
  return {
    studentId: null,
  };
}

export function studentCheckInReducer(state = getInitialState(), action: Actions): StudentCheckInState {
  switch (action.type) {
    case RESET: {
      return getInitialState();
    }

    case SET_STUDENT:
      return {
        ...state,
        studentId: action.studentId,
      };

    default:
      return state;
  }
}
