import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Block } from '../../../shared/state-models/block';
import { DeletableState } from '../../../shared/redux/deletable/deletable.state';

export interface BlockSummariesState extends LoadableState, DeletableState {
  blocks: {
    [id: string]: Block
  };
}
