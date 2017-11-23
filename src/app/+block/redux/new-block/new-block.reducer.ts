import { Block } from '../../../shared/state-models/block';
import { getInitialSavableState, getSaveSuccessState, getSavingState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';
import { NewBlockState } from './new-block.state';
import { Actions, RESET_NEW_BLOCK, UPDATE_NEW_BLOCK, CREATE_BLOCK_REQUEST, CREATE_BLOCK_SUCCESS, CREATE_BLOCK_FAILURE } from './new-block.actions';

function getInitialState(): NewBlockState {
  const startDate = new Date();
  startDate.setHours(18, 0);
  return {
    ...getInitialSavableState(),
    block: {
      teachers: [],
      startDate
    } as Block
  };
}

export function newBlockReducer(state = getInitialState(), action: Actions): NewBlockState {
  switch (action.type) {
    case RESET_NEW_BLOCK:
      return getInitialState();

    case UPDATE_NEW_BLOCK:
      return Object.assign(
        {},
        state,
        { block: action.block }
      );

    case CREATE_BLOCK_REQUEST:
      return getSavingState(state);

    case CREATE_BLOCK_SUCCESS:
      return getSaveSuccessState(state);

    case CREATE_BLOCK_FAILURE:
      return getSaveFailureState(state, action.error);

    default:
      return state;
  }
}
