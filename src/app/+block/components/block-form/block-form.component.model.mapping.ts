import { Block } from '../../../shared/state-models/block';
import { BlockModel } from './block-form.component.model';
export function modelToBlock(model: BlockModel): Block {
  return {
    name: model.name,
    startDate: model.startDate,
    isInviteOnly: model.inviteOnly,
    minutesPerClass: model.minutesPerClass,
    numberOfClasses: model.numberOfClasses,
    classCapacity: model.classCapacity,
    teachers: model.teacher ? [model.teacher] : []
  } as Block;
}
