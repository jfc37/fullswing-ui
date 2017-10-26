import { SavableState } from '../../../shared/redux/savable/savable.state';
import { Block } from '../../../shared/state-models/block';

export interface NewBlockState extends SavableState {
  block: Block;
}
