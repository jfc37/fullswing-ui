import { StudentsState } from './students.state';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { ineeda } from 'ineeda';
import { Actions, SetStudents } from './students.actions';
import { studentsReducer } from './students.reducer';
import { User } from '../../../shared/state-models/teacher';

describe('studentsReducer', () => {
  const state = ineeda<StudentsState>();
  let action: Actions;

  function reduce() {
    return studentsReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new SetStudents([]);
    });

    it('should start with empty set of students', () => {
      const newState = studentsReducer(undefined, action);
      expect(newState.students).toEqual({});
    });
  });

  describe('Set Students', () => {
    const expected = [
      ineeda<User>({id: 531})
    ];

    beforeEach(() => {
      action = new SetStudents(expected);
    });

    it('should set students', () => {
      const newState = reduce();
      expect(newState.students[expected[0].id]).toBe(expected[0]);
    });
  });
});
