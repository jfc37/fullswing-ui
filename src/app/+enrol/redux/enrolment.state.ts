import { SelectedBlocksState } from './selected-blocks/selected-blocks.state';
import { EnrolableBlocksState } from './enrolable-blocks/enrolable-blocks.state';

export interface EnrolmentState {
  enrolableBlocks: EnrolableBlocksState;
  selectedBlocks: SelectedBlocksState;
}
