import { UserClaimsState } from './user-claims.state';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_CLAIMS_FAILURE,
  LOAD_CLAIMS_REQUEST,
  LOAD_CLAIMS_SUCCESS,
} from './user-claims.actions';

function getInitialState(): UserClaimsState {
  return {
    ...getInitialLoadableState(),
    claims: []
  };
}

export function userClaimsReducer(state = getInitialState(), action: Actions): UserClaimsState {
  switch (action.type) {
    case LOAD_CLAIMS_REQUEST:
      return getLoadingState(state);

    case LOAD_CLAIMS_SUCCESS:
      return Object.assign({}, getLoadSuccessState(state), { claims: action.claims });

    case LOAD_CLAIMS_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
