import { PassPurchaseState } from './pass-purchase.state';
import { Actions, RESET, SET_STUDENT, SET_PASS } from './pass-purchase.actions';

function getInitialState(): PassPurchaseState {
  return {
    studentId: null,
    passId: null,
  };
}

export function passPurchaseReducer(state = getInitialState(), action: Actions): PassPurchaseState {
  switch (action.type) {
    case RESET: {
      return getInitialState();
    }

    case SET_STUDENT:
      return {
        ...state,
        studentId: action.studentId,
      };

    case SET_PASS:
      return {
        ...state,
        passId: action.passId,
      };

    default:
      return state;
  }
}
