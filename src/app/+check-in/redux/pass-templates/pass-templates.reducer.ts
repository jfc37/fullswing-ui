import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';
import {
  Actions,
  LOAD_PASS_TEMPLATES_FAILURE,
  LOAD_PASS_TEMPLATES_REQUEST,
  LOAD_PASS_TEMPLATES_SUCCESS,
} from './pass-templates.actions';
import { PassTemplatesState } from './pass-templates.state';

function getInitialState(): PassTemplatesState {
  return {
    ...getInitialLoadableState(),
    passTemplates: {}
  };
}

export function passTemplatesReducer(state = getInitialState(), action: Actions): PassTemplatesState {
  switch (action.type) {
    case LOAD_PASS_TEMPLATES_REQUEST:
      return getLoadingState(state);

    case LOAD_PASS_TEMPLATES_SUCCESS:
      return Object.assign({}, getLoadSuccessState(state), { passTemplates: action.passTemplates });

    case LOAD_PASS_TEMPLATES_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
