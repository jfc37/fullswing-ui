import { StudentCheckInState } from './student-check-in.state';
import { Actions, RESET, SET_STUDENT, SET_CLASS, CHECK_IN_REQUEST, CHECK_IN_SUCCESS, CHECK_IN_FAILURE, REMOVE_STUDENT_REQUEST, REMOVE_STUDENT_SUCCESS, REMOVE_STUDENT_FAILURE } from './student-check-in.actions';

function getInitialState(): StudentCheckInState {
  return {
    studentId: null,
    classId: null,

    checkInError: null,
    hasCheckedIn: false,
    isCheckingIn: false,

    removeError: null,
    hasRemoved: false,
    isRemoving: false,
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

      case SET_CLASS:
        return {
          ...state,
          classId: action.classId
        };

      case CHECK_IN_REQUEST: {
        return {
          ...state,
          isCheckingIn: true,
          checkInError: null,
        };
      }

      case CHECK_IN_SUCCESS: {
        return {
          ...state,
          isCheckingIn: false,
          hasCheckedIn: true,
          checkInError: null,
        };
      }

      case CHECK_IN_FAILURE: {
        return {
          ...state,
          isCheckingIn: false,
          hasCheckedIn: false,
          checkInError: action.error,
        };
      }

      case REMOVE_STUDENT_REQUEST: {
        return {
          ...state,
          isRemoving: true,
          removeError: null,
        };
      }

      case REMOVE_STUDENT_SUCCESS: {
        return {
          ...state,
          isRemoving: false,
          hasRemoved: true,
          removeError: null,
        };
      }

      case REMOVE_STUDENT_FAILURE: {
        return {
          ...state,
          isRemoving: false,
          hasRemoved: false,
          removeError: action.error,
        };
      }

    default:
      return state;
  }
}
