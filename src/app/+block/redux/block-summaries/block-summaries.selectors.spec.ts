import { Block } from '../../../shared/state-models/block';
import { getBlockSummariesModel } from './block-summaries.selectors';
import { getBlockSummariesState } from '../block.reducer';
import { BlockSummariesState } from './block-summaries.state';
import { ineeda } from 'ineeda';

describe('Block Summaries Selectors', () => {
  describe('getBlockSummariesModel', () => {
    let state: BlockSummariesState;

    beforeEach(() => {
      state = ineeda<BlockSummariesState>({blocks: []});
    });

    it(`should return null when state is null`, () => {
      const model = getBlockSummariesModel(null);
      expect(model).toBeNull();
    });

    describe(`isLoading`, () => {
      it(`should be false when hasLoaded is true `, () => {
        state.hasLoaded = true;
        const model = getBlockSummariesModel(state);
        expect(model.isLoading).toBe(false);
      });

      it(`should be true when hasLoaded is false `, () => {
        state.hasLoaded = false;
        const model = getBlockSummariesModel(state);
        expect(model.isLoading).toBe(true);
      });
    });

    describe(`hasError`, () => {
      it(`should be false when load has error `, () => {
        state.loadError = 'ERROR';
        const model = getBlockSummariesModel(state);
        expect(model.hasError).toBe(true);
      });

      it(`should be true when load doesn't have error `, () => {
        state.loadError = null;
        const model = getBlockSummariesModel(state);
        expect(model.hasError).toBe(false);
      });
    });

    describe(`blocks`, () => {
      beforeEach(() => {
        const block = ineeda<Block>({
          startDate: new Date(),
          endDate: new Date()
        });
        state.blocks = [block, block];
      });

      it(`should have same number of blocks`, () => {
        const model = getBlockSummariesModel(state);
        expect(model.blocks.length).toBe(state.blocks.length);
      });

      it(`should map name`, () => {
        state.blocks[0].name = 'name';
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].name).toBe(state.blocks[0].name);
      });

      it(`should map first class date from start date`, () => {
        state.blocks[0].startDate = new Date('2017-3-20');
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].firstClassDate).toBe('20 Mar');
      });

      it(`should map last class date from end date`, () => {
        state.blocks[0].endDate = new Date('2017-3-20');
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].lastClassDate).toBe('20 Mar');
      });

      it(`should map day from start date`, () => {
        state.blocks[0].startDate = new Date('2017-3-20');
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].day).toBe('Monday');
      });

      it(`should map time from start date`, () => {
        state.blocks[0].startDate = new Date('2017-03-20T19:15:00');
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].time).toBe('7:15 pm');
      });

      it(`should map details route from id`, () => {
        state.blocks[0].id = 542;
        const model = getBlockSummariesModel(state);
        expect(model.blocks[0].detailsRoute).toBe(`details/542`);
      });
    });
  });
});
