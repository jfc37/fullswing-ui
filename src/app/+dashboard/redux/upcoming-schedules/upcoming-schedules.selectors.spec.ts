import { Class } from '../../../shared/state-models/class';
import { UpcomingSchedulesState } from './upcoming-schedules.state';
import { ineeda } from 'ineeda';
import { getUpcomingScheduleModel } from './upcoming-schedules.selectors';

describe('Upcoming Schedule Selectors', () => {
  let state: UpcomingSchedulesState;

  beforeEach(() => {
    state = ineeda<UpcomingSchedulesState>({classes: []});
  });

  describe('getUpcomingScheduleModel', () => {
    it(`should return null when state is null`, () => {
      state = null;

      const model = getUpcomingScheduleModel(state);

      expect(model).toBeNull();
    });

    it(`isLoading should be true when state has not loaded`, () => {
      state.hasLoaded = false;

      const model = getUpcomingScheduleModel(state);
      expect(model.isLoading).toBe(true);
    });

    it(`isLoading should be false when state has loaded`, () => {
      state.hasLoaded = true;

      const model = getUpcomingScheduleModel(state);
      expect(model.isLoading).toBe(false);
    });

    it(`hasError should be false when state has no loading error`, () => {
      state.loadError = null;

      const model = getUpcomingScheduleModel(state);
      expect(model.hasError).toBe(false);
    });

    it(`hasError should be true when state has loading error`, () => {
      state.loadError = 'ERROR';

      const model = getUpcomingScheduleModel(state);
      expect(model.hasError).toBe(true);
    });

    describe('Class mapping', () => {
      it(`should map name`, () => {
        const theClass = ineeda<Class>({name: 'class name'});
        state.classes = [theClass];

        const model = getUpcomingScheduleModel(state);
        expect(model.scheduledClasses[0].name).toBe(theClass.name);
      });

      it(`should map start time`, () => {
        const theClass = ineeda<Class>({startTime: new Date()});
        state.classes = [theClass];

        const model = getUpcomingScheduleModel(state);
        expect(model.scheduledClasses[0].startTime).toBe(theClass.startTime);
      });
    });
  });
});
