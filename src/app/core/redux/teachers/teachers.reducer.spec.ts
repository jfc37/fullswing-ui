import { User } from '../../../shared/state-models/teacher';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { teachersReducer } from './teachers.reducer';
import { TeachersState } from './teachers.state';
import { Actions, LoadTeachersFailure, LoadTeachersRequest, LoadTeachersSuccess } from './teachers.actions';
import { ineeda } from 'ineeda';

describe('teachersReducer', () => {
  const state = ineeda<TeachersState>();
  let action: Actions;

  function reduce() {
    return teachersReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadTeachersRequest();
    });

    it('should start with empty set of teachers', () => {
      const newState = teachersReducer(undefined, action);
      expect(newState.teachers).toEqual([]);
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadTeachersRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const expected = [];
    beforeEach(() => {
      action = new LoadTeachersSuccess(expected);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set teachers', () => {
      expected[0] = ineeda<User>({id: 111});
      const newState = reduce();
      expect(newState.teachers[111]).toBe(expected[0]);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadTeachersFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
