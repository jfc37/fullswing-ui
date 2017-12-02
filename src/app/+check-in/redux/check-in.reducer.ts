import { classesReducer } from './classes/classes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInState } from './check-in.state';
import { getSelectedClass } from './classes/classes.selectors';

export const checkInReducer = {
  classes: classesReducer,
};

export const getCheckInState = createFeatureSelector<CheckInState>('checkIn');

export const getClassesState = createSelector(
  getCheckInState,
  state => state.classes
);

export const getSelectedClassSelector = createSelector(
  getClassesState,
  getSelectedClass
);
