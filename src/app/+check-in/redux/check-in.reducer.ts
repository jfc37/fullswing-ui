import { classesReducer } from './classes/classes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInState } from './check-in.state';
import {
  getAttendingStudentsModel,
  getRegisteredStudentsModel,
  getSelectedClass,
  getSelectedClassId,
  getSelectedClassName,
} from './classes/classes.selectors';
import { studentsReducer } from './students/students.reducer';

export const checkInReducer = {
  classes: classesReducer,
  students: studentsReducer,
};

export const getCheckInState = createFeatureSelector<CheckInState>('checkIn');

export const getClassesState = createSelector(
  getCheckInState,
  state => state.classes
);

export const getStudentsState = createSelector(
  getCheckInState,
  state => state.students
);

export const getSelectedClassIdSelector = createSelector(
  getClassesState,
  getSelectedClassId
);

export const getSelectedClassSelector = createSelector(
  getClassesState,
  getSelectedClass
);

export const getSelectedClassNameSelector = createSelector(
  getClassesState,
  getSelectedClassName
);

export const getRegisteredStudentsModelSelector = createSelector(
  getClassesState,
  getStudentsState,
  getRegisteredStudentsModel
);

export const getAttendingStudentsModelSelector = createSelector(
  getClassesState,
  getStudentsState,
  getAttendingStudentsModel
);
