import { NewBlockState } from './new-block.state';
import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { Actions, CreateBlockRequest, ResetNewBlock, UpdateNewBlock, CreateBlockSuccess, CreateBlockFailure } from './new-block.actions';
import { ineeda } from 'ineeda';
import { Block } from '../../../shared/state-models/block';
import { getSavingState, getSaveSuccessState, getSaveFailureState } from '../../../shared/redux/savable/savable.reducer';
import { newBlockReducer } from './new-block.reducer';

describe('newBlockReducer', () => {
  const state = ineeda<NewBlockState>();
  let action: Actions;

  function reduce() {
    return newBlockReducer(state, action);
  }

  describe('Reset New Block', () => {
    beforeEach(() => {
      action = new ResetNewBlock();
    });

    it('should return initial state', () => {
      const newState = reduce();
      expect(newState).toEqual(newBlockReducer(undefined, new ResetNewBlock()));
    });
  });

  describe('Update New Block', () => {
    const expectedId = 543;

    beforeEach(() => {
      state.block = {} as Block;
    });

    it('should update supplied selected block properties', () => {
      const expectedName = 'new name';
      const block = ineeda<Block>({ id: expectedId, name: expectedName });
      action = new UpdateNewBlock(block);

      const newState = reduce();
      expect(newState.block.name).toBe(expectedName);
    });

    it('should remove unsupplied selected block properties', () => {
      const expectedName = 'old name';
      state.block.name = expectedName;
      const block = ineeda<Block>({ id: expectedId });
      action = new UpdateNewBlock(block);

      const newState = reduce();
      expect(newState.block.name).toBeFalsy();
    });
  });

  describe('Create Request', () => {
    beforeEach(() => {
      action = new CreateBlockRequest();
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSavingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Create Success', () => {
    beforeEach(() => {
      action = new CreateBlockSuccess();
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSaveSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Create Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new CreateBlockFailure(expectedError);
    });

    it('should set state according to saving state', () => {
      const newState = reduce();
      const expectedState = getSaveFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
