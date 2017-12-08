import { StudentCheckInState } from './student-check-in.state';
import { ineeda } from 'ineeda';
import { Actions, ResetStudentCheckIn, SetStudentForCheckIn } from './student-check-in.actions';
import { studentCheckInReducer } from './student-check-in.reducer';

describe('studentCheckInReducer', () => {
  const state = ineeda<StudentCheckInState>();
  let action: Actions;

  function reduce() {
    return studentCheckInReducer(state, action);
  }

  describe('Reset', () => {
    beforeEach(() => {
      action = new ResetStudentCheckIn();
    });

    it('should set student id to null', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.studentId).toBeNull();
    });
  });

  describe('SetStudent', () => {
    const studentId = 6743;

    beforeEach(() => {
      action = new SetStudentForCheckIn(studentId);
    });

    it('should set student id', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.studentId).toBe(studentId);
    });
  });
});
