import { PassPurchaseState } from './pass-purchase.state';
import { Actions, RESET, SET_STUDENT, SET_PASS, PURCHASE_PASS_REQUEST, PURCHASE_PASS_SUCCESS, PURCHASE_PASS_FAILURE } from './pass-purchase.actions';

function getInitialState(): PassPurchaseState {
  return {
    studentId: null,
    passId: null,

    hasPurchased: false,
    isPurchasing: false,
    purchaseError: null,
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

    case PURCHASE_PASS_REQUEST: {
      return {
        ...state,
        isPurchasing: true,
        purchaseError: null,
      };
    }

    case PURCHASE_PASS_SUCCESS: {
      return {
        ...state,
        isPurchasing: false,
        hasPurchased: true,
        purchaseError: null,
      };
    }

    case PURCHASE_PASS_FAILURE: {
      return {
        ...state,
        isPurchasing: false,
        purchaseError: action.error,
      };
    }

    default:
      return state;
  }
}
