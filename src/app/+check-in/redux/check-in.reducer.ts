import { getPassSelectionModel } from './pass-templates/pass-templates.selectors';
import { PurchasePassPreambleModel } from '../components/purchase-pass-preamble/purchase-pass-preamble.component.model';
import { currentStudentReducer } from './current-student/current-student.reducer';
import { passesReducer } from './passes/passes.reducer';
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
import { getPassesForStudent, getHasStudentGotValidPass } from './passes/passes.selectors';
import { getCurrentStudentId } from './current-student/current-student.selectors';
import { passTemplatesReducer } from './pass-templates/pass-templates.reducer';
import { getHasLoaded } from '../../shared/redux/loadable/loadable.selectors';

export const checkInReducer = {
  classes: classesReducer,
  students: studentsReducer,
  passes: passesReducer,
  currentStudent: currentStudentReducer,
  passTemplates: passTemplatesReducer,
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

export const getPassesState = createSelector(
  getCheckInState,
  state => state.passes
);

export const getCurrentStudentState = createSelector(
  getCheckInState,
  state => state.currentStudent
);

export const getPassTemplatesState = createSelector(
  getCheckInState,
  state => state.passTemplates
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

export const getCurrentStudentIdSelector = createSelector(
  getCurrentStudentState,
  getCurrentStudentId,
);

export const getPassesForStudentSelector = createSelector(
  getPassesState,
  getCurrentStudentIdSelector,
  getPassesForStudent
);

export const getHasStudentGotValidPassSelector = createSelector(
  getPassesState,
  getCurrentStudentIdSelector,
  getHasStudentGotValidPass
);

export const getHasLoadedPassTemplatesSelector = createSelector(
  getPassTemplatesState,
  getHasLoaded
);

export const getStudentNameSelector = createSelector(
  getStudentsState,
  getCurrentStudentIdSelector,
  (studentState, studentId) => !!studentState && studentState.students[studentId] && studentState.students[studentId].fullName
);

export const getPurchasePassPreambleModelSelector = createSelector(
  getStudentNameSelector,
  studentName => ({ studentName} as PurchasePassPreambleModel)
);

export const getPassSelectionModelSelector = createSelector(
  getPassTemplatesState,
  getPassSelectionModel
);
