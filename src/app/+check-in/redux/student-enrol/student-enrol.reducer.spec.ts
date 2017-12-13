import { ineeda } from 'ineeda';
import { StudentEnrolState } from './student-enrol.state';
import { Actions } from './student-enrol.actions';
import * as stateActions from './student-enrol.actions';
import { studentEnrolReducer } from './student-enrol.reducer';

describe('studentEnrolReducer', () => {
  const state = ineeda<StudentEnrolState>();
  let action: Actions;

  function reduce() {
    return studentEnrolReducer(state, action);
  }

  describe('Reset', () => {
    beforeEach(() => {
      action = new stateActions.ResetStudentEnrol();
    });

    it('should set student id to null', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.studentId).toBeNull();
    });
  });

  describe('SetStudent', () => {
    const studentId = 6743;

    beforeEach(() => {
      action = new stateActions.SetStudentToEnrol(studentId);
    });

    it('should set student id', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.studentId).toBe(studentId);
    });
  });

  describe('SetBlock', () => {
    const blockId = 8864;

    beforeEach(() => {
      action = new stateActions.SetBlockToEnrolIn(blockId);
    });

    it('should set block id', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.blockId).toBe(blockId);
    });
  });

  describe('EnrolRequest', () => {
    beforeEach(() => {
      action = new stateActions.StudentEnrolRequest();
    });

    it('should set isEnrolling to true', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.isEnrolling).toBe(true);
    });

    it('should clear error', () => {
      state.enrolError = 'ERROR';
      const newState = studentEnrolReducer(state, action);
      expect(newState.enrolError).toBeNull();
    });
  });

  describe('EnrolSuccess', () => {
    beforeEach(() => {
      action = new stateActions.StudentEnrolSuccess();
    });

    it('should set isEnrolling to false', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.isEnrolling).toBe(false);
    });

    it('should clear error', () => {
      state.enrolError = 'ERROR';
      const newState = studentEnrolReducer(state, action);
      expect(newState.enrolError).toBeNull();
    });

    it('should set hasEnrolled to true', () => {
      state.hasEnrolled = false;
      const newState = studentEnrolReducer(state, action);
      expect(newState.hasEnrolled).toBe(true);
    });
  });

  describe('EnrolFailure', () => {
    const error = 'ERROR';
    beforeEach(() => {
      action = new stateActions.StudentEnrolFailure(error);
    });

    it('should set isEnrolling to false', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.isEnrolling).toBe(false);
    });

    it('should set error', () => {
      const newState = studentEnrolReducer(state, action);
      expect(newState.enrolError).toBe('ERROR');
    });

    it('should set hasCheckIn to false', () => {
      state.hasEnrolled = true;
      const newState = studentEnrolReducer(state, action);
      expect(newState.hasEnrolled).toBe(false);
    });
  });
});
