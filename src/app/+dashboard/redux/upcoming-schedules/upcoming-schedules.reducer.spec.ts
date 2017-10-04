import { Class } from '../../../shared/state-models/class';
import { UpcomingSchedulesState } from './upcoming-schedules.state';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { ineeda } from 'ineeda';
import { Actions, LoadUpcomingScheduleRequest, LoadUpcomingScheduleSuccess, LoadUpcomingScheduleFailure } from './upcoming-schedules.actions';
import { upcomingSchedulesReducer } from './upcoming-schedules.reducer';

describe('upcomingSchedulesReducer', () => {
  const state = ineeda<UpcomingSchedulesState>();
  let action: Actions;

  function reduce() {
    return upcomingSchedulesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadUpcomingScheduleRequest();
    });

    it('should start with empty set of classes', () => {
      const newState = upcomingSchedulesReducer(undefined, action);
      expect(newState.classes).toEqual([]);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadUpcomingScheduleRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expectedClasses = ineeda<Class[]>();
    beforeEach(() => {
      action = new LoadUpcomingScheduleSuccess(expectedClasses);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set classes', () => {
      const newState = reduce();
      expect(newState.classes).toBe(expectedClasses);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadUpcomingScheduleFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
