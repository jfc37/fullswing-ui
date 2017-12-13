import { studentCheckInReducer } from './student-check-in/student-check-in.reducer';
import { getPassSelectionModel } from './pass-templates/pass-templates.selectors';
import { PurchasePassPreambleModel } from '../components/purchase-pass-preamble/purchase-pass-preamble.component.model';
import { passPurchaseReducer } from './pass-purchase/pass-purchase.reducer';
import { passesReducer } from './passes/passes.reducer';
import { classesReducer } from './classes/classes.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckInState } from './check-in.state';
import {
  getAttendingStudentsModel,
  getRegisteredStudentsModel,
  getSelectedClass,
} from './classes/classes.selectors';
import { studentsReducer } from './students/students.reducer';
import { getPassesForStudent, getHasStudentGotValidPass } from './passes/passes.selectors';
import { getPassId, getStudentId } from './pass-purchase/pass-purchase.selectors';
import { passTemplatesReducer } from './pass-templates/pass-templates.reducer';
import { getHasLoaded } from '../../shared/redux/loadable/loadable.selectors';
import { studentSearchReducer } from './student-search/student-search.reducer';
import { AddStudentModel } from '../components/add-student/add-student.component.model';
import { studentEnrolReducer } from './student-enrol/student-enrol.reducer';

export const checkInReducer = {
  classes: classesReducer,
  students: studentsReducer,
  passes: passesReducer,
  studentCheckIn: studentCheckInReducer,
  passPurchase: passPurchaseReducer,
  passTemplates: passTemplatesReducer,
  studentSearch: studentSearchReducer,
  studentEnrol: studentEnrolReducer,
};

// Feature selector
export const getCheckInState = createFeatureSelector<CheckInState>('checkIn');

// Slice selectors
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

export const getStudentCheckInState = createSelector(
  getCheckInState,
  state => state.studentCheckIn
);

export const getPassPurchaseState = createSelector(
  getCheckInState,
  state => state.passPurchase
);

export const getPassTemplatesState = createSelector(
  getCheckInState,
  state => state.passTemplates
);

export const getStudentSearchState = createSelector(
  getCheckInState,
  state => state.studentSearch
);

export const getStudentEnrolState = createSelector(
  getCheckInState,
  state => state.studentEnrol
);

// Student class check in selectors
export const getCheckInClassId = createSelector(
  getStudentCheckInState,
  state => !!state && state.classId
);

export const getCheckInStudentId = createSelector(
  getStudentCheckInState,
  state => !!state && state.studentId
);

// Classes selectors

export const getSelectedClassSelector = createSelector(
  getClassesState,
  getCheckInClassId,
  getSelectedClass
);

export const getSelectedClassNameSelector = createSelector(
  getSelectedClassSelector,
  selectedClass => !!selectedClass && selectedClass.name
);

export const getSelectedClassBlockIdSelector = createSelector(
  getSelectedClassSelector,
  selectedClass => !!selectedClass && selectedClass.blockId
);

export const getRegisteredStudentsModelSelector = createSelector(
  getSelectedClassSelector,
  getStudentsState,
  getRegisteredStudentsModel
);

export const getAttendingStudentsModelSelector = createSelector(
  getSelectedClassSelector,
  getStudentsState,
  getAttendingStudentsModel
);

export const getPassPurchaseStudentIdSelector = createSelector(
  getPassPurchaseState,
  getStudentId,
);

export const getPassPurchasePassIdSelector = createSelector(
  getPassPurchaseState,
  getPassId,
);

export const getIsPurchasingPassSelector = createSelector(
  getPassPurchaseState,
  state => state.isPurchasing,
);

export const getHasPurchasedSelector = createSelector(
  getPassPurchaseState,
  state => state.hasPurchased,
);



export const getDisablePurchasePassButtonSelector = createSelector(
  getPassPurchasePassIdSelector,
  getIsPurchasingPassSelector,
  (passId, isPurchasing) => !passId || isPurchasing,
);

export const getPassesForStudentSelector = createSelector(
  getPassesState,
  getCheckInStudentId,
  getPassesForStudent
);

export const getHasStudentGotValidPassSelector = createSelector(
  getPassesState,
  getCheckInStudentId,
  getHasStudentGotValidPass
);

export const getHasLoadedPassTemplatesSelector = createSelector(
  getPassTemplatesState,
  getHasLoaded
);

export const getStudentNameSelector = createSelector(
  getStudentsState,
  getPassPurchaseStudentIdSelector,
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

// Student Search
export const getStudentSearchTextSelector = createSelector(
  getStudentSearchState,
  state => !!state && state.searchText
);

export const getAddStudentModelSelector = createSelector(
  getStudentSearchState,
  state => !!state && ({
    matchingStudents: state.searchResults.map(s => ({ id: s.id, name: s.fullName }))
  } as AddStudentModel)
);

export const getHasEnrolledStudentSelector = createSelector(
  getStudentEnrolState,
  state => state && state.hasEnrolled
);
