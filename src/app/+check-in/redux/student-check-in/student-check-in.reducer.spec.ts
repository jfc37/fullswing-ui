import { StudentCheckInState } from './student-check-in.state';
import { ineeda } from 'ineeda';
import {
  Actions,
  CheckInFailure,
  CheckInRequest,
  CheckInSuccess,
  ResetStudentCheckIn,
  SetClassForCheckIn,
  SetStudentForCheckIn,
  RemoveStudentRequest,
  RemoveStudentSuccess,
  RemoveStudentFailure,
} from './student-check-in.actions';
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

  describe('SetClass', () => {
    const classId = 8864;

    beforeEach(() => {
      action = new SetClassForCheckIn(classId);
    });

    it('should set class id', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.classId).toBe(classId);
    });
  });

  describe('CheckInRequest', () => {
    beforeEach(() => {
      action = new CheckInRequest();
    });

    it('should set isCheckingIn to true', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isCheckingIn).toBe(true);
    });

    it('should clear error', () => {
      state.checkInError = 'ERROR';
      const newState = studentCheckInReducer(state, action);
      expect(newState.checkInError).toBeNull();
    });
  });

  describe('CheckInSuccess', () => {
    beforeEach(() => {
      action = new CheckInSuccess();
    });

    it('should set isCheckingIn to false', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isCheckingIn).toBe(false);
    });

    it('should clear error', () => {
      state.checkInError = 'ERROR';
      const newState = studentCheckInReducer(state, action);
      expect(newState.checkInError).toBeNull();
    });

    it('should set hasCheckIn to true', () => {
      state.hasCheckedIn = false;
      const newState = studentCheckInReducer(state, action);
      expect(newState.hasCheckedIn).toBe(true);
    });
  });

  describe('CheckInFailure', () => {
    const error = 'ERROR';
    beforeEach(() => {
      action = new CheckInFailure(error);
    });

    it('should set isCheckingIn to false', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isCheckingIn).toBe(false);
    });

    it('should set error', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.checkInError).toBe('ERROR');
    });

    it('should set hasCheckIn to false', () => {
      state.hasCheckedIn = true;
      const newState = studentCheckInReducer(state, action);
      expect(newState.hasCheckedIn).toBe(false);
    });
  });

  describe('RemoveStudentRequest', () => {
    beforeEach(() => {
      action = new RemoveStudentRequest();
    });

    it('should set isRemoving to true', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isRemoving).toBe(true);
    });

    it('should clear error', () => {
      state.removeError = 'ERROR';
      const newState = studentCheckInReducer(state, action);
      expect(newState.removeError).toBeNull();
    });
  });

  describe('RemoveStudentSuccess', () => {
    beforeEach(() => {
      action = new RemoveStudentSuccess();
    });

    it('should set isRemoving to false', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isRemoving).toBe(false);
    });

    it('should clear error', () => {
      state.removeError = 'ERROR';
      const newState = studentCheckInReducer(state, action);
      expect(newState.removeError).toBeNull();
    });

    it('should set hasRemoved to true', () => {
      state.hasRemoved = false;
      const newState = studentCheckInReducer(state, action);
      expect(newState.hasRemoved).toBe(true);
    });
  });

  describe('RemoveStudentFailure', () => {
    const error = 'ERROR';
    beforeEach(() => {
      action = new RemoveStudentFailure(error);
    });

    it('should set isRemoving to false', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.isRemoving).toBe(false);
    });

    it('should set error', () => {
      const newState = studentCheckInReducer(state, action);
      expect(newState.removeError).toBe('ERROR');
    });

    it('should set hasRemoved to false', () => {
      state.hasRemoved = true;
      const newState = studentCheckInReducer(state, action);
      expect(newState.hasRemoved).toBe(false);
    });
  });
});
