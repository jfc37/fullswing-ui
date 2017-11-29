import { SelectedBlocksState } from './selected-blocks.state';
export const getHasAnySelectedBlocks
  = (state: SelectedBlocksState) => !!state && Object.values(state.blocks).some(Boolean);
