import { enrolableBlocksReducer } from './enrolable-blocks/enrolable-blocks.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrolableBlocksState } from './enrolable-blocks/enrolable-blocks.state';
import { EnrolmentState } from './enrolment.state';
import { getHasLoaded } from '../../shared/redux/loadable/loadable.selectors';
import { getBlockEnrolmentModel } from './enrolable-blocks/enrolable-blocks.selectors';

export const enrolmentReducer = {
  enrolableBlocks: enrolableBlocksReducer,
};

export const getEnrolmentState = createFeatureSelector<EnrolmentState>('enrolment');

export const getEnrolableBlockState = createSelector(
  getEnrolmentState,
  state => state.enrolableBlocks
);

export const getHasLoadedEnrolableBlocksSelector = createSelector(
  getEnrolableBlockState,
  getHasLoaded
);

export const getBlockEnrolmentModelSelector = createSelector(
  getEnrolableBlockState,
  getBlockEnrolmentModel
);
