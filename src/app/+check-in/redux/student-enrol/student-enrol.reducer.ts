import { StudentEnrolState } from './student-enrol.state';
import { Actions } from './student-enrol.actions';
import * as stateActions from './student-enrol.actions';

function getInitialState(): StudentEnrolState {
  return {
    studentId: null,
    blockId: null,

    enrolError: null,
    hasEnrolled: false,
    isEnrolling: false,
  };
}

export function studentEnrolReducer(state = getInitialState(), action: Actions): StudentEnrolState {
  switch (action.type) {
    case stateActions.RESET: {
      return getInitialState();
    }

    case stateActions.SET_STUDENT:
      return {
        ...state,
        studentId: action.studentId,
      };

      case stateActions.SET_BLOCK:
        return {
          ...state,
          blockId: action.blockId
        };

      case stateActions.STUDENT_ENROL_REQUEST: {
        return {
          ...state,
          isEnrolling: true,
          enrolError: null,
        };
      }

      case stateActions.STUDENT_ENROL_SUCCESS: {
        return {
          ...state,
          isEnrolling: false,
          hasEnrolled: true,
          enrolError: null,
        };
      }

      case stateActions.STUDENT_ENROL_FAILURE: {
        return {
          ...state,
          isEnrolling: false,
          hasEnrolled: false,
          enrolError: action.error,
        };
      }

      case stateActions.STUDENT_ENROLMENT_COMPLETE: {
        return {
          ...state,
          hasEnrolled: false,
          studentId: null,
        };
      }

    default:
      return state;
  }
}
