import { UpcomingSchedulesState } from './upcoming-schedules.state';
import { getInitialLoadableState, getLoadingState, getLoadSuccessState, getLoadFailureState } from '../../../shared/redux/loadable/loadable.reducer';
import { Actions, LOAD_UPCOMING_SCHEDULE_REQUEST, LOAD_UPCOMING_SCHEDULE_SUCCESS, LOAD_UPCOMING_SCHEDULE_FAILURE } from './upcoming-schedules.actions';

function getInitialState(): UpcomingSchedulesState {
  return {
    ...getInitialLoadableState(),
    classes: []
  };
}

export function upcomingSchedulesReducer(state = getInitialState(), action: Actions): UpcomingSchedulesState {
  switch (action.type) {
    case LOAD_UPCOMING_SCHEDULE_REQUEST:
      return getLoadingState(state);

    case LOAD_UPCOMING_SCHEDULE_SUCCESS:
      return Object.assign({}, getLoadSuccessState(state), { classes: action.classes });

    case LOAD_UPCOMING_SCHEDULE_FAILURE:
      return getLoadFailureState(state, action.error);

    default:
      return state;
  }
}
