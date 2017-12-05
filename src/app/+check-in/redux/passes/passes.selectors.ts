import { PassesState } from './passes.state';

export const getPassesForStudent = (state: PassesState, studentId: number) =>
  !!state && state.passes[studentId];

export const getHasStudentGotValidPass = (state: PassesState, studentId: number) =>
  getPassesForStudent(state, studentId) && getPassesForStudent(state, studentId).some(pass => pass.valid);
