import { User } from '../../../shared/state-models/teacher';
import { TeachersState } from '../../../core/redux/teachers/teachers.state';
import { BlockModel } from '../../components/block-form/block-form.component.model';
import { DraftBlocksState } from './draft-blocks.state';
import { Block } from '../../../shared/state-models/block';
import { ineeda } from 'ineeda';
import { getDraftBlockFormModel } from './draft-blocks.selectors';

describe('Draft Blocks Selectors', () => {
  describe('getBlockFormModel', () => {
    let state: DraftBlocksState;
    let teacherState: TeachersState;

    beforeEach(() => {
      state = ineeda<DraftBlocksState>();
      teacherState = ineeda<TeachersState>({teachers: []});
    });

    it(`should return null when state is null`, () => {
      const model = getDraftBlockFormModel(null, teacherState);
      expect(model).toBeNull();
    });

    it(`should return null when teachers state is null`, () => {
      const model = getDraftBlockFormModel(state, null);
      expect(model).toBeNull();
    });

    describe(`isLoading`, () => {
      it(`should be false when has loaded and is not saving `, () => {
        state.hasLoaded = true;
        state.isSaving = false;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.isLoading).toBe(false);
      });

      it(`should be true when hasLoaded is false `, () => {
        state.hasLoaded = false;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.isLoading).toBe(true);
      });

      it(`should be true when isSaving is true `, () => {
        state.isSaving = true;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.isLoading).toBe(true);
      });
    });

    describe(`hasError`, () => {
      it(`should be true when load has error `, () => {
        state.loadError = 'ERROR';
        state.saveError = null;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.hasError).toBe(true);
      });

      it(`should be true when saving has error `, () => {
        state.saveError = 'ERROR';
        state.loadError = null;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.hasError).toBe(true);
      });

      it(`should be false when load and saving doesn't have error `, () => {
        state.loadError = null;
        state.saveError = null;
        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.hasError).toBe(false);
      });
    });

    describe(`block`, () => {
      it(`should be null when no selected id`, () => {
        state.selectedId = null;
        state.blocks = {};

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block).toBeFalsy();
      });

      it(`should be null when no blocks with selected id match`, () => {
        state.selectedId = 1;
        state.blocks = {};

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block).toBeFalsy();
      });

      it(`should map name`, () => {
        const expected = 'name';
        state.selectedId = 1;
        state.blocks[1].name = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.name).toBe(expected);
      });

      it(`should map invite only`, () => {
        const expected = true;
        state.selectedId = 1;
        state.blocks[1].isInviteOnly = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.inviteOnly).toBe(expected);
      });

      it(`should map minutes per class`, () => {
        const expected = 40;
        state.selectedId = 1;
        state.blocks[1].minutesPerClass = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.minutesPerClass).toBe(expected);
      });

      it(`should map number of classes`, () => {
        const expected = 5;
        state.selectedId = 1;
        state.blocks[1].numberOfClasses = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.numberOfClasses).toBe(expected);
      });

      it(`should map class capacity`, () => {
        const expected = 5;
        state.selectedId = 1;
        state.blocks[1].classCapacity = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.classCapacity).toBe(expected);
      });

      it(`should map number of start date`, () => {
        const expected = new Date();
        state.selectedId = 1;
        state.blocks[1].startDate = expected;

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.block.startDate).toBe(expected);
      });

      it(`should map teachers`, () => {
        teacherState.teachers[111] = ineeda<User>({id: 111, fullName: 'name'});

        const model = getDraftBlockFormModel(state, teacherState);
        expect(model.teachers[0].value).toBe(111);
        expect(model.teachers[0].name).toBe('name');
      });
    });
  });
});
