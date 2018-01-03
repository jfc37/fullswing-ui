import { PassPurchaseState } from './pass-purchase.state';
import { ineeda } from 'ineeda';
import { Actions, ResetPassPurchase, SetStudentForPassPurchase, SetPassForPurchase, PurchasePassRequest, PurchasePassSuccess, PurchasePassFailure } from './pass-purchase.actions';
import { passPurchaseReducer } from './pass-purchase.reducer';

describe('passPurchaseReducer', () => {
  const state = ineeda<PassPurchaseState>();
  let action: Actions;

  function reduce() {
    return passPurchaseReducer(state, action);
  }

  describe('Reset', () => {
    beforeEach(() => {
      action = new ResetPassPurchase();
    });

    it('should set student id to null', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.studentId).toBeNull();
    });

    it('should set pass id to null', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.passId).toBeNull();
    });

    it('should set isPurchasing to false', () => {
      state.isPurchasing = true;
      const newState = passPurchaseReducer(state, action);
      expect(newState.isPurchasing).toBe(false);
    });

    it('should set hasPurchased to false', () => {
      state.hasPurchased = true;
      const newState = passPurchaseReducer(state, action);
      expect(newState.hasPurchased).toBe(false);
    });

    it('should set purchaseError to null', () => {
      state.purchaseError = 'ERROR';
      const newState = passPurchaseReducer(state, action);
      expect(newState.purchaseError).toBeNull();
    });
  });

  describe('SetStudent', () => {
    const studentId = 6743;

    beforeEach(() => {
      action = new SetStudentForPassPurchase(studentId);
    });

    it('should set student id', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.studentId).toBe(studentId);
    });
  });

  describe('SetPass', () => {
    const passId = 984;

    beforeEach(() => {
      action = new SetPassForPurchase(passId);
    });

    it('should set pass id', () => {
      const newState = passPurchaseReducer(state, action);
      expect(newState.passId).toBe(passId);
    });
  });

  describe('Purchase Pass Request', () => {
    beforeEach(() => {
      action = new PurchasePassRequest();
    });

    it('should set isPurchasing to true', () => {
      state.isPurchasing = false;
      const newState = passPurchaseReducer(state, action);
      expect(newState.isPurchasing).toBe(true);
    });

    it('should set purchaseError to null', () => {
      state.purchaseError = 'ERROR';
      const newState = passPurchaseReducer(state, action);
      expect(newState.purchaseError).toBeNull();
    });
  });

  describe('Purchase Pass Success', () => {
    beforeEach(() => {
      action = new PurchasePassSuccess();
    });

    it('should set isPurchasing to false', () => {
      state.isPurchasing = true;
      const newState = passPurchaseReducer(state, action);
      expect(newState.isPurchasing).toBe(false);
    });

    it('should set hasPurchased to true', () => {
      state.hasPurchased = false;
      const newState = passPurchaseReducer(state, action);
      expect(newState.hasPurchased).toBe(true);
    });

    it('should set purchaseError to null', () => {
      state.purchaseError = 'ERROR';
      const newState = passPurchaseReducer(state, action);
      expect(newState.purchaseError).toBeNull();
    });
  });

  describe('Purchase Pass Failure', () => {
    beforeEach(() => {
      action = new PurchasePassFailure('ERROR');
    });

    it('should set isPurchasing to false', () => {
      state.isPurchasing = true;
      const newState = passPurchaseReducer(state, action);
      expect(newState.isPurchasing).toBe(false);
    });


    it('should set purchaseError', () => {
      state.purchaseError = null;
      const newState = passPurchaseReducer(state, action);
      expect(newState.purchaseError).toBe('ERROR');
    });
  });
});
