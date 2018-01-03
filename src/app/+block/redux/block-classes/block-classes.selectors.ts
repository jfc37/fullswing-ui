import { BlockClassesState } from './block-classes.state';
import { ClassesState } from '../classes/classes.state';
import { ClassesSummaryModel, ClassSummaryModel } from '../../components/classes-summary/classes-summary.component.model';
import * as moment from 'moment';

export const getSelectedBlockClassIds = (state: BlockClassesState) => {
  if (!state) {
    return null;
  }

  return state.classes[state.selectedBlockId];
};

export const getSelectedBlockClasses = (state: BlockClassesState, classesState: ClassesState) => {
  if (!state || !classesState) {
    return null;
  }

  const selectedClassIds = getSelectedBlockClassIds(state);

  if (!selectedClassIds) {
    return null;
  }

  return selectedClassIds.map(id => classesState.classes[id]);
};

export const getClassSummariesModel = (blockClassesState: BlockClassesState, classesState: ClassesState) => {
  if (!blockClassesState || !classesState) {
    return null;
  }

  const classes = (getSelectedBlockClasses(blockClassesState, classesState) || [])
    .filter(Boolean)
    .map(c => ({
      id: c.id,
      name: c.name,
      attendenceNumber: c.actualStudentIds.length,
      date: moment(c.startTime).format('Do MMMM'),
      checkInRoute: `/check-in/class/${c.id}`
    } as ClassSummaryModel));

  return {
    isLoading: blockClassesState.isLoading,
    hasError: !!blockClassesState.loadError,
    classes,
  } as ClassesSummaryModel;
};
