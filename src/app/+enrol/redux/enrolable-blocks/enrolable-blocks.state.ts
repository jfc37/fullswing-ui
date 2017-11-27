import { Block } from '../../../shared/state-models/block';
import { LoadableState } from '../../../shared/redux/loadable/loadable.state';

export interface EnrolableBlocksState extends LoadableState {
  blocks: {
    [id: number]: EnrolableBlock
  };
}

export interface EnrolableBlock extends Block {
  isAlreadyRegistered: boolean;
  spacesAvailable: number;
}
