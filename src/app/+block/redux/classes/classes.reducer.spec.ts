import { Class } from '../../../shared/state-models/class';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { classesReducer } from './classes.reducer';
import { ClassesState } from './classes.state';
import { Actions, SetClasses } from './classes.actions';
import { ineeda } from 'ineeda';

describe('classesReducer', () => {
  const state = ineeda<ClassesState>();
  let action: Actions;

  function reduce() {
    return classesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new SetClasses([]);
    });

    it('should start with empty set of classes', () => {
      const newState = classesReducer(undefined, action);
      expect(newState.classes).toEqual({});
    });
  });

  describe('Set Classes', () => {
    const expected = [
      ineeda<Class>({id: 531})
    ];

    beforeEach(() => {
      action = new SetClasses(expected);
    });

    it('should set classes', () => {
      const newState = reduce();
      expect(newState.classes[expected[0].id]).toBe(expected[0]);
    });
  });
});
