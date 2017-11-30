import { getHasSaved } from '../../shared/redux/savable/savable.selectors';
import { enrolableBlocksReducer } from './enrolable-blocks/enrolable-blocks.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrolableBlocksState } from './enrolable-blocks/enrolable-blocks.state';
import { EnrolmentState } from './enrolment.state';
import { getHasLoaded } from '../../shared/redux/loadable/loadable.selectors';
import { getBlockEnrolmentModel } from './enrolable-blocks/enrolable-blocks.selectors';
import { selectedBlocksReducer } from './selected-blocks/selected-blocks.reducer';
import { getEnrolEnabled, getSelectedBlockIds } from './selected-blocks/selected-blocks.selectors';

export const enrolmentReducer = {
  enrolableBlocks: enrolableBlocksReducer,
  selectedBlocks: selectedBlocksReducer,
};

export const getEnrolmentState = createFeatureSelector<EnrolmentState>('enrolment');

export const getEnrolableBlockState = createSelector(
  getEnrolmentState,
  state => state.enrolableBlocks
);

export const getSelectedBlockState = createSelector(
  getEnrolmentState,
  state => state.selectedBlocks
);

export const getHasLoadedEnrolableBlocksSelector = createSelector(
  getEnrolableBlockState,
  getHasLoaded
);

export const getBlockEnrolmentModelSelector = createSelector(
  getEnrolableBlockState,
  getBlockEnrolmentModel
);

export const getEnrolEnabledSelector = createSelector(
  getSelectedBlockState,
  getEnrolEnabled
);

export const getHasEnrolledSuccessfullySelector = createSelector(
  getSelectedBlockState,
  getHasSaved
);

export const getSelectedBlockIdsSelector = createSelector(
  getSelectedBlockState,
  getSelectedBlockIds
);
