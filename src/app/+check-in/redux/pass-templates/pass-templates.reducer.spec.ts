import { getLoadFailureState, getLoadingState, getLoadSuccessState } from '../../../shared/redux/loadable/loadable.reducer';
import { passTemplatesReducer } from './pass-templates.reducer';
import { PassTemplatesState } from './pass-templates.state';
import { Actions, LoadPassTemplatesFailure, LoadPassTemplatesRequest, LoadPassTemplatesSuccess } from './pass-templates.actions';
import { ineeda } from 'ineeda';
import { PassTemplateSummary } from '../../../shared/state-models/pass-template';

describe('passTemplateReducer', () => {
  const state = ineeda<PassTemplatesState>();
  let action: Actions;

  function reduce() {
    return passTemplatesReducer(state, action);
  }

  describe('initial state', () => {
    beforeEach(() => {
      action = new LoadPassTemplatesRequest();
    });

    it('should start with empty set of passTemplates', () => {
      const newState = passTemplatesReducer(undefined, action);
      expect(newState.passTemplates).toEqual({});
    });
  });

  describe('Load Request', () => {
    beforeEach(() => {
      action = new LoadPassTemplatesRequest();
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadingState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Success', () => {
    beforeEach(() => {
      action = new LoadPassTemplatesSuccess([]);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadSuccessState(null);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });

  describe('Load Failure', () => {
    const expectedError = 'ERROR';
    beforeEach(() => {
      action = new LoadPassTemplatesFailure(expectedError);
    });

    it('should set state according to loading state', () => {
      const newState = reduce();
      const expectedState = getLoadFailureState(null, expectedError);
      Object.keys(expectedState).forEach(k => expect(newState[k]).toBe(expectedState[k]));
    });
  });
});
