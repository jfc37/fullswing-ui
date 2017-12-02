import { ClassesState } from './classes.state';

export const getSelectedClass = (state: ClassesState) =>
  !!state && state.classes[state.selectedId];
