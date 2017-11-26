import { BlockClassesState } from './block-classes.state';
import {
  Actions,
  LOAD_BLOCK_CLASSES_FAILURE,
  LOAD_BLOCK_CLASSES_REQUEST,
  LOAD_BLOCK_CLASSES_SUCCESS,
  SET_SELECTED_BLOCK_ID,
} from './block-classes.actions';
import {
  getInitialLoadableState,
  getLoadFailureState,
  getLoadingState,
  getLoadSuccessState,
} from '../../../shared/redux/loadable/loadable.reducer';


function getInitialState(): BlockClassesState {
  return {
    selectedBlockId: null,
    classes: {},
    ...getInitialLoadableState()
  };
}

export function blockClassesReducer(state = getInitialState(), action: Actions): BlockClassesState {
  switch (action.type) {
    case SET_SELECTED_BLOCK_ID:
      return {
        ...state,
        selectedBlockId: action.id
      };

    case LOAD_BLOCK_CLASSES_REQUEST:
      return getLoadingState(state);

    case LOAD_BLOCK_CLASSES_SUCCESS:
      return Object.assign(
        {},
        getLoadSuccessState(state),
        { classes: { ...state.classes, [action.blockId]: action.classIds } }
      );

    case LOAD_BLOCK_CLASSES_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
