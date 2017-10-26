import { modelToBlock } from './block-form.component.model.mapping';
import { BlockModel } from './block-form.component.model';
import { ineeda } from 'ineeda';
describe('modelToBlock', () => {

  [
    {
      modelProp: 'name',
      blockProp: 'name'
    },
    {
      modelProp: 'startDate',
      blockProp: 'startDate'
    },
    {
      modelProp: 'inviteOnly',
      blockProp: 'isInviteOnly'
    },
    {
      modelProp: 'minutesPerClass',
      blockProp: 'minutesPerClass'
    },
    {
      modelProp: 'numberOfClasses',
      blockProp: 'numberOfClasses'
    },
    {
      modelProp: 'classCapacity',
      blockProp: 'classCapacity'
    },
  ].forEach(data => {
    it(`should map ${data.modelProp} to ${data.blockProp}`, () => {
      const model = ineeda<BlockModel>();

      const block = modelToBlock(model);

      expect(block[data.blockProp]).toBe(model[data.modelProp]);
    });
  });

  it(`should map teachers`, () => {
    const id = 3;
    const model = ineeda<BlockModel>({teacher: id});

    const block = modelToBlock(model);

    expect(block.teachers[0]).toBe(model.teacher);
  });
});
