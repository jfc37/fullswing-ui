import { SelectedBlocksState } from './selected-blocks.state';

export const getEnrolEnabled
  = (state: SelectedBlocksState) =>
    !!state
    && !state.isSaving
    && !state.saveError
    && !state.hasSaved
    && Object.values(state.blocks).some(Boolean);

export const getSelectedBlockIds
  = (state: SelectedBlocksState) =>
  !!state && Object.keys(state.blocks).filter(id => state.blocks[id])
    .map(id => Number(id));
