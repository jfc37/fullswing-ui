import { upcomingSchedulesReducer } from './upcoming-schedules/upcoming-schedules.reducer';
import { getCurrentPassesModel } from './current-passes/current-passes.selectors';
import { DashboardState } from './dashboard.state';
import { CurrentPassesState } from './current-passes/current-passes.state';
import { currentPassesReducer } from './current-passes/current-passes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getHasLoaded, getHasLoadingError } from '../../shared/redux/loadable/loadable.state';
import { getUpcomingScheduleModel } from './upcoming-schedules/upcoming-schedules.selectors';

export const dashboardReducer = {
  currentPasses: currentPassesReducer,
  upcomingSchedules: upcomingSchedulesReducer,
};

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getCurrentPassesState = createSelector(
  getDashboardState,
  state => state.currentPasses
);

export const getCurrentPassesModelSelector = createSelector(
  getCurrentPassesState,
  getCurrentPassesModel
);

export const getUpcomingScheduleState = createSelector(
  getDashboardState,
  state => state.upcomingSchedules
);

export const getUpcomingScheduleModelSelector = createSelector(
  getUpcomingScheduleState,
  getUpcomingScheduleModel
);
