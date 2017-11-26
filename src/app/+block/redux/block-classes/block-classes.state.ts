import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Class } from '../../../shared/state-models/class';

export interface BlockClassesState extends LoadableState {
  selectedBlockId: number;
  classes: {
    [blockId: number]: number[]
  };
}
