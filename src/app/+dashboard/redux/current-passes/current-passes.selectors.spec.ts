import { Pass } from '../../../shared/state-models/pass';
import { getCurrentPassesModel } from './current-passes.selectors';
import { CurrentPassesState } from './current-passes.state';
import { ineeda } from 'ineeda';

describe('Current Passes Selectors', () => {
  let state: CurrentPassesState;

  beforeEach(() => {
    state = ineeda<CurrentPassesState>({passes: []});
  });

  describe('getCurrentPassesModel', () => {
    it(`should return null when state is null`, () => {
      state = null;

      const model = getCurrentPassesModel(state);

      expect(model).toBeNull();
    });

    it(`isLoading should be true when state has not loaded`, () => {
      state.hasLoaded = false;

      const model = getCurrentPassesModel(state);
      expect(model.isLoading).toBe(true);
    });

    it(`isLoading should be false when state has loaded`, () => {
      state.hasLoaded = true;

      const model = getCurrentPassesModel(state);
      expect(model.isLoading).toBe(false);
    });

    it(`hasError should be false when state has no loading error`, () => {
      state.loadError = null;

      const model = getCurrentPassesModel(state);
      expect(model.hasError).toBe(false);
    });

    it(`hasError should be true when state has loading error`, () => {
      state.loadError = 'ERROR';

      const model = getCurrentPassesModel(state);
      expect(model.hasError).toBe(true);
    });

    describe('Pass mapping', () => {
      it(`should map pass type`, () => {
        const pass = ineeda<Pass>({passType: 'clip'});
        state.passes = [pass];

        const model = getCurrentPassesModel(state);
        expect(model.passes[0].type).toBe(pass.passType);
      });

      it(`should map expiry`, () => {
        const pass = ineeda<Pass>({endDate: new Date()});
        state.passes = [pass];

        const model = getCurrentPassesModel(state);
        expect(model.passes[0].expiry).toBe(pass.endDate);
      });

      it(`should not have additional information when no clips remaining`, () => {
        const pass = ineeda<Pass>({clipsRemaining: undefined});
        state.passes = [pass];

        const model = getCurrentPassesModel(state);
        expect(model.passes[0].additionalInfo).toBeFalsy();
      });

      it(`should have additional information when clips remaining`, () => {
        const pass = ineeda<Pass>({clipsRemaining: 4});
        state.passes = [pass];

        const model = getCurrentPassesModel(state);
        expect(model.passes[0].additionalInfo).toBe(`${pass.clipsRemaining} left`);
      });
    });
  });
});
