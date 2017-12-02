import { UserClaimsState } from '../core/redux/user-claims/user-claims.state';
import { getHasLoaded } from '../shared/redux/loadable/loadable.selectors';
import { TeachersState } from '../core/redux/teachers/teachers.state';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import * as fromUser from '../core/redux/user/user.reducer';
import * as fromTeachers from '../core/redux/teachers/teachers.reducer';
import * as fromUserClaims from '../core/redux/user-claims/user-claims.reducer';
import { UserState } from '../core/redux/user/user.state';
import { RouterStateUrl } from './custom-router.state';
import { getIsAuthenticated, getTopNavModel } from '../core/redux/user/user.selectors';
import { getIsTeacher, getIsAdmin } from '../core/redux/user-claims/user-claims.selectors';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  user: UserState;
  teachers: TeachersState;
  userClaims: UserClaimsState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  teachers: fromTeachers.teachersReducer,
  userClaims: fromUserClaims.userClaimsReducer,
  routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  // ? []
  : [];

/**
 * User Selectors
 */
export const getUserState = createFeatureSelector<UserState>('user');

export const getTeachersState = createFeatureSelector<TeachersState>('teachers');

export const getUserClaimsState = createFeatureSelector<UserClaimsState>('userClaims');

export const getIsUserAuthenticated = createSelector(
  getUserState,
  getIsAuthenticated
);

export const getTopNavModelSelector = createSelector(
  getUserState,
  getTopNavModel
);

export const getAreTeachersLoadedSelector = createSelector(
  getTeachersState,
  getHasLoaded
);

export const getAreUserClaimsLoadedSelector = createSelector(
  getUserClaimsState,
  getHasLoaded
);

export const getIsAuthenticationCompleteSelector = createSelector(
  getIsUserAuthenticated,
  getAreUserClaimsLoadedSelector,
  (isAuthenticated, hasLoadedClaims) => isAuthenticated && hasLoadedClaims
);

export const getIsTeacherSelector = createSelector(
  getUserClaimsState,
  getIsTeacher
);

export const getIsAdminSelector = createSelector(
  getUserClaimsState,
  getIsAdmin
);
