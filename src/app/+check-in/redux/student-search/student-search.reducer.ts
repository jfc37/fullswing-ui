import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  STUDENT_SEARCH_FAILURE,
  STUDENT_SEARCH_REQUEST,
  STUDENT_SEARCH_SUCCESS,
  RESET_STUDENT_SEARCH,
  SET_STUDENT_SEARCH_TEXT,
  SET_STUDENT_SEARCH_RESULTS,
} from './student-search.actions';
import { StudentSearchState } from './student-search.state';

function getInitialState(): StudentSearchState {
  return {
    ...getInitialLoadableState(),
    searchResults: [],
     searchText: null,
  };
}

export function studentSearchReducer(state = getInitialState(), action: Actions): StudentSearchState {
  switch (action.type) {
    case RESET_STUDENT_SEARCH:
      return getInitialState();

    case SET_STUDENT_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      };

    case SET_STUDENT_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults
      };


    case STUDENT_SEARCH_REQUEST:
      return getLoadingState(state);

    case STUDENT_SEARCH_SUCCESS:
      return getLoadSuccessState(state);

    case STUDENT_SEARCH_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
