import { SelectionOption } from '../../../shared/state-models/selection-option';
import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';

export interface BlockFormModel extends LoadableModel {
  block: BlockModel;
  teachers: SelectionOption[];
}

export interface BlockModel {
  name: string;
  startDate: Date;
  minutesPerClass: number;
  numberOfClasses: number;
  classCapacity: number;
  teacher: number;
  inviteOnly: boolean;
}
