import { PassPurchaseState } from './pass-purchase.state';
import { ineeda } from 'ineeda';
import { Actions, Reset, SetStudent, SetPass } from './pass-purchase.actions';
import { passPurchaseReducer } from './pass-purchase.reducer';

describe('passPurchaseReducer', () => {
  const state = ineeda<PassPurchaseState>();
  let action: Actions;

  function reduce() {
    return passPurchaseReducer(state, action);
  }

  describe('Reset', () => {
    beforeEach(() => {
      action = new Reset();
    });

    it('should set student id to null', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.studentId).toBeNull();
    });

    it('should set pass id to null', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.passId).toBeNull();
    });
  });

  describe('SetStudent', () => {
    const studentId = 6743;

    beforeEach(() => {
      action = new SetStudent(studentId);
    });

    it('should set student id', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.studentId).toBe(studentId);
    });
  });

  describe('SetPass', () => {
    const passId = 984;

    beforeEach(() => {
      action = new SetPass(passId);
    });

    it('should set pass id', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.passId).toBe(passId);
    });
  });
});
