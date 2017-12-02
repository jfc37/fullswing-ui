import { Class } from '../../../shared/state-models/class';
import { ineeda } from 'ineeda';
import { getLoadingState, getLoadSuccessState, getLoadFailureState } from '../../../shared/redux/loadable/loadable.reducer';
import { ClassesState } from './classes.state';
import { Actions, LoadClassRequest, SetSelectedClassId, LoadClassSuccess, LoadClassFailure } from './classes.actions';
import { classesReducer } from './classes.reducer';

describe('classesReducer', () => {
  const state = ineeda<ClassesState>();
  let action: Actions;

  function reduce() {
    return classesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new SetSelectedClassId(122);
    });

    it(`should set classes to empty object`, () => {
      const newState = classesReducer(undefined, action);
      expect(newState.classes).toEqual({});
    });
  });

  describe('Set Selected Class Id', () => {
    const expectedId = 122;
    beforeEach(() => {
      action = new SetSelectedClassId(expectedId);
    });

    it('should set selected id', () => {
      const newState = reduce();
      expect(newState.selectedId).toBe(expectedId);
    });
  });

  describe('Load Request', () => {
    const id = 534;

    beforeEach(() => {
      action = new LoadClassRequest(id);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    const theClass = ineeda<Class>({id: 532});

    beforeEach(() => {
      action = new LoadClassSuccess(theClass);
    });

    it('should set state according to loading success state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });

    it('should set class', () => {
      const newState = reduce();
      expect(newState.classes[theClass.id]).toBe(theClass);
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadClassFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
