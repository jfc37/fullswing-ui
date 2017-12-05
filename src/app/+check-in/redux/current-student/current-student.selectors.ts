import { CurrentStudentState } from './current-student.state';

export const getCurrentStudentId = (state: CurrentStudentState) => !!state && state.currentStudentId;
