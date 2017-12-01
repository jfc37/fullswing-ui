import { Block } from '../../../shared/state-models/block';
import { ineeda } from 'ineeda';
import { EnrolableBlocksState, EnrolableBlock } from './enrolable-blocks.state';
import { getBlockEnrolmentModel } from './enrolable-blocks.selectors';

describe('Enrolable Block Selectors', () => {
  describe('getBlockEnrolmentModel', () => {
    let state: EnrolableBlocksState;

    beforeEach(() => {
      state = ineeda<EnrolableBlocksState>();
    });

    it(`should return null when state is null`, () => {
      const model = getBlockEnrolmentModel(null);
      expect(model).toBeNull();
    });

    describe(`isLoading`, () => {
      it(`should be false when hasLoaded is true `, () => {
        state.hasLoaded = true;
        const model = getBlockEnrolmentModel(state);
        expect(model.isLoading).toBe(false);
      });

      it(`should be true when hasLoaded is false `, () => {
        state.hasLoaded = false;
        const model = getBlockEnrolmentModel(state);
        expect(model.isLoading).toBe(true);
      });
    });

    describe(`hasError`, () => {
      it(`should be false when load has error `, () => {
        state.loadError = 'ERROR';
        const model = getBlockEnrolmentModel(state);
        expect(model.hasError).toBe(true);
      });

      it(`should be true when load doesn't have error `, () => {
        state.loadError = null;
        const model = getBlockEnrolmentModel(state);
        expect(model.hasError).toBe(false);
      });
    });

    describe(`blocks`, () => {
      const id = 324;

      beforeEach(() => {
        const block = ineeda<EnrolableBlock>({
          startDate: new Date(),
          id
        });
        state.blocks = {[block.id]: block};
      });

      it(`should separate blocks that start on different day`, () => {
        state.blocks = {
          [1]: ineeda<EnrolableBlock>({startDate: new Date(2017, 10, 3)}),
          [2]: ineeda<EnrolableBlock>({startDate: new Date(2017, 10, 2)}),
        };

        const model = getBlockEnrolmentModel(state);
        expect(model.groupedBlocks.length).toBe(2);
        expect(model.groupedBlocks[0].blocks.length).toBe(1);
        expect(model.groupedBlocks[1].blocks.length).toBe(1);
      });

      it(`should group blocks that start on the same day`, () => {
        const block = ineeda<EnrolableBlock>({
          startDate: new Date(),
          endDate: new Date(),
          id
        });
        state.blocks = {
          [1]: ineeda<EnrolableBlock>({startDate: new Date()}),
          [2]: ineeda<EnrolableBlock>({startDate: new Date()}),
        };

        const model = getBlockEnrolmentModel(state);
        expect(model.groupedBlocks.length).toBe(1);
        expect(model.groupedBlocks[0].blocks.length).toBe(2);
      });

      it(`should set 'Starting On' in format '<Day>, <Month> <Date>'`, () => {
        const expectedStartedOn = 'Saturday, February 4th';
        state.blocks[id].startDate = new Date('2017-2-4');

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].startingOn).toBe(expectedStartedOn);
      });

      it(`should map id`, () => {
        state.blocks[id].id = 23;

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].id).toBe(state.blocks[id].id);
      });

      it(`should map is registered`, () => {
        state.blocks[id].isAlreadyRegistered = true;

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].isRegistered).toBe(true);
      });

      it(`should map name`, () => {
        state.blocks[id].name = 'name';

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].name).toBe(state.blocks[id].name);
      });

      it(`should map spaces left`, () => {
        state.blocks[id].spacesAvailable = 20;

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].spacesLeft).toBe(state.blocks[id].spacesAvailable);
      });

      it(`should map start time`, () => {
        state.blocks[id].startDate = new Date(2017, 3, 3, 19, 15);

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].startTime).toBe('7:15PM');
      });

      it(`should map end time`, () => {
        state.blocks[id].startDate = new Date(2017, 3, 3, 19, 15);
        state.blocks[id].minutesPerClass = 60;

        const model = getBlockEnrolmentModel(state);

        expect(model.groupedBlocks[0].blocks[0].endTime).toBe('8:15PM');
      });
    });
  });
});
