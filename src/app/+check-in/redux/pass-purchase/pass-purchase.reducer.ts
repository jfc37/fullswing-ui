import { PassPurchaseState } from './pass-purchase.state';
import {
  Actions, SET_STUDENT,
} from './pass-purchase.actions';

function getInitialState(): PassPurchaseState {
  return {
    studentId: null,
  };
}

export function passPurchaseReducer(state = getInitialState(), action: Actions): PassPurchaseState {
  switch (action.type) {
    case SET_STUDENT:
      return {
        ...state,
        studentId: action.studentId,
      };

    default:
      return state;
  }
}
