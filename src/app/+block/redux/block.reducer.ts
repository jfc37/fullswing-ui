import { getHasLoaded } from '../../shared/redux/loadable/loadable.selectors';
import { newBlockReducer } from './new-block/new-block.reducer';
import { getTeachersState } from '../../reducers';
import { draftBlocksReducer } from './draft-blocks/draft-blocks.reducer';
import { getBlockSummariesModel } from './block-summaries/block-summaries.selectors';
import { BlockSummariesState } from './block-summaries/block-summaries.state';
import { blockSummariesReducer } from './block-summaries/block-summaries.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlockState } from './block.state';
import { getDraftBlockFormModel, getSelectedDraftBlock } from './draft-blocks/draft-blocks.selectors';
import { getHasSaved } from '../../shared/redux/savable/savable.selectors';
import { getNewBlockFormModel } from './new-block/new-block.selectors';

export const blockReducer = {
  blockSummaries: blockSummariesReducer,
  draftBlocks: draftBlocksReducer,
  newBlock: newBlockReducer,
};

export const getBlockState = createFeatureSelector<BlockState>('block');

export const getBlockSummariesState = createSelector(
  getBlockState,
  state => state.blockSummaries
);

export const getDraftBlocksState = createSelector(
  getBlockState,
  state => state.draftBlocks
);

export const getNewBlockState = createSelector(
  getBlockState,
  state => state.newBlock
);

export const getBlockSummariesModelSelector = createSelector(
  getBlockSummariesState,
  getBlockSummariesModel
);

export const getHasBlockSummariesLoadedSelector = createSelector(
  getBlockSummariesState,
  getHasLoaded
);

export const getSelectedDraftBlockSelector = createSelector(
  getDraftBlocksState,
  getSelectedDraftBlock
);

export const getHasDraftBlockSavedSelector = createSelector(
  getDraftBlocksState,
  getHasSaved
);

export const getDraftBlockFormModelSelector = createSelector(
  getDraftBlocksState,
  getTeachersState,
  getDraftBlockFormModel
);

export const getNewBlockSelector = createSelector(
  getNewBlockState,
  state => state.block
);

export const getNewBlockFormModelSelector = createSelector(
  getNewBlockState,
  getTeachersState,
  getNewBlockFormModel
);

export const getHasNewBlockSavedSelector = createSelector(
  getNewBlockState,
  getHasSaved
);
