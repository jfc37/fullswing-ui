import { SelectedBlocksState } from './selected-blocks.state';

export const getEnrolEnabled
  = (state: SelectedBlocksState) =>
    !!state
    && !state.isSaving
    && Object.values(state.blocks).some(Boolean);
