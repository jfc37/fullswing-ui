import { UserState } from './user.state';
import { Actions, SET_AUTHORISATION, SET_PROFILE, SetAuthorisation } from './user.actions';


const initialState: UserState = {
  authorisation: {},
  profile: {
    claims: [],
  }
};

export function reducer(state = initialState, action: Actions): UserState {
  switch (action.type) {
    case SET_AUTHORISATION:
      return {
        ...state,
        authorisation: {
          ...state.authorisation,
          idToken: action.idToken,
          accessToken: action.accessToken,
        }
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      };

    default:
      return state;
  }
}
