import { SelectedBlocksState } from './selected-blocks.state';

export const getEnrolEnabled
  = (state: SelectedBlocksState) =>
    !!state
    && !state.isSaving
    && !state.saveError
    && !state.hasSaved
    && Object.values(state.blocks).some(Boolean);
