import { getBlockSummariesModel } from './block-summaries/block-summaries.selectors';
import { BlockSummariesState } from './block-summaries/block-summaries.state';
import { blockSummariesReducer } from './block-summaries/block-summaries.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getHasLoaded, getHasLoadingError } from '../../shared/redux/loadable/loadable.state';
import { BlockState } from './block.state';

export const blockReducer = {
  blockSummaries: blockSummariesReducer,
};

export const getBlockState = createFeatureSelector<BlockState>('block');

export const getBlockSummariesState = createSelector(
  getBlockState,
  state => state.blockSummaries
);

export const getBlockSummariesModelSelector = createSelector(
  getBlockSummariesState,
  getBlockSummariesModel
);
