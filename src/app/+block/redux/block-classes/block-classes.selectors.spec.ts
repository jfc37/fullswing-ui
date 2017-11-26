import { Class } from '../../../shared/state-models/class';
import { ClassesState } from '../classes/classes.state';
import { BlockClassesState } from './block-classes.state';
import { Block } from '../../../shared/state-models/block';
import { ineeda } from 'ineeda';
import { getClassSummariesModel } from './block-classes.selectors';

describe('Block Classes Selectors', () => {
  describe('getClassSummariesModel', () => {
    let blockClassesState: BlockClassesState;
    let classesState: ClassesState;

    beforeEach(() => {
      blockClassesState = ineeda<BlockClassesState>({classes: {}});
      classesState = ineeda<ClassesState>();
    });

    it(`should return null when block classes state is null`, () => {
      const model = getClassSummariesModel(null, classesState);
      expect(model).toBeNull();
    });

    it(`should return null when classes state is null`, () => {
      const model = getClassSummariesModel(blockClassesState, null);
      expect(model).toBeNull();
    });

    describe(`isLoading`, () => {
      it(`should be true when isLoading `, () => {
        blockClassesState.isLoading = true;
        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.isLoading).toBe(true);
      });

      it(`should be false when not isLoading `, () => {
        blockClassesState.isLoading = false;
        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.isLoading).toBe(false);
      });
    });

    describe(`hasError`, () => {
      it(`should be false when load has error `, () => {
        blockClassesState.loadError = 'ERROR';
        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.hasError).toBe(true);
      });

      it(`should be true when load doesn't have error `, () => {
        blockClassesState.loadError = null;
        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.hasError).toBe(false);
      });
    });

    describe(`classes`, () => {
      const id = 324;
      const blockId = 632;
      const classId = 232;

      beforeEach(() => {
        blockClassesState.selectedBlockId = blockId;
        blockClassesState.classes = {[blockId]: [classId]};

        const relatedClass = ineeda<Class>({id: classId, startTime: new Date()});
        classesState.classes = {[classId]: relatedClass};
      });

      it(`should be empty when no class ids for block`, () => {
        blockClassesState.classes[blockId] = undefined;

          const model = getClassSummariesModel(blockClassesState, classesState);
          expect(model.classes.length).toBe(0);
      });

      it(`should be empty when no class ids for block`, () => {
        blockClassesState.classes[blockId] = undefined;

          const model = getClassSummariesModel(blockClassesState, classesState);
          expect(model.classes.length).toBe(0);
      });

      it(`should be empty when no classes match class ids`, () => {
        classesState.classes[classId] = undefined;

          const model = getClassSummariesModel(blockClassesState, classesState);
          expect(model.classes.length).toBe(0);
      });

      it(`should have same number of classes`, () => {
        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.classes.length).toBe(blockClassesState.classes[blockId].length);
      });

      it(`should map id`, () => {
        classesState.classes[classId].id = classId;

        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.classes[0].id).toBe(classId);
      });

      it(`should map name`, () => {
        classesState.classes[classId].name = 'name';

        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.classes[0].name).toBe('name');
      });

      it(`should map date`, () => {
        classesState.classes[classId].startTime = new Date('2017-3-20');

        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.classes[0].date).toBe('20th March');
      });

      it(`should map attendence number`, () => {
        classesState.classes[classId].actualStudentIds = [1, 2, 3];

        const model = getClassSummariesModel(blockClassesState, classesState);
        expect(model.classes[0].attendenceNumber).toBe(3);
      });
    });
  });
});
