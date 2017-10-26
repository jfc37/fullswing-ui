import { SavableState } from '../../../shared/redux/savable/savable.state';
import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Block } from '../../../shared/state-models/block';

export interface DraftBlocksState extends LoadableState, SavableState {
  blocks: {
    [id: string]: Block
  };

  selectedId?: number;
}
