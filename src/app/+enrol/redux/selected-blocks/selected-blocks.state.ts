import { SavableState } from '../../../shared/redux/savable/savable.state';

export interface SelectedBlocksState extends SavableState {
  blocks: {
    [id: number]: boolean;
  };
}
