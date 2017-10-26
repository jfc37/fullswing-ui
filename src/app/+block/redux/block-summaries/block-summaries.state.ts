import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Block } from '../../../shared/state-models/block';

export interface BlockSummariesState extends LoadableState {
  blocks: {
    [id: string]: Block
  };
}
