import { TopNavModel } from '../../components/top-nav/top-nav.component.model';
import { UserState, Authorisation } from './user.state';
import { tokenNotExpired } from 'angular2-jwt';

export const authorisationChecks = {
  tokenNotExpired: tokenNotExpired
};

function isAuthenticated(authorisation: Authorisation) {
  return !!authorisation.accessToken
    && !!authorisation.idToken
    && authorisationChecks.tokenNotExpired(authorisation.accessToken, authorisation.idToken);
}

export const getTopNavModel = (state: UserState) => {
  if (!state) {
    return null;
  }

  return {
    name: state.profile.name || state.profile.nickname,
    canLogout: isAuthenticated(state.authorisation)
  } as TopNavModel;
};

export const getIsAuthenticated = (state: UserState) => {
  if (!state) {
    return false;
  }

  return isAuthenticated(state.authorisation);
};
