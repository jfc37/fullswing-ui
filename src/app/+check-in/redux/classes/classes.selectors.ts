import {
  RegisteredStudentsModel,
  StudentModel,
} from '../../components/registered-students/registered-students.component.model';
import { Class } from '../../../shared/state-models/class';
import { ClassesState } from './classes.state';
import { StudentsState } from '../students/students.state';

export const getSelectedClass = (state: ClassesState) =>
  !!state && state.classes[state.selectedId];

export const getStudents = (state: StudentsState) => !!state && state.students;

export const getSelectedClassName = (state: ClassesState) =>
  (getSelectedClass(state) || {} as Class).name;


export const getRegisteredStudentsModel = (classesState: ClassesState, studentsState: StudentsState) => {
  const selectedClass = getSelectedClass(classesState);
  const students = getStudents(studentsState);

  if (!selectedClass || !students) {
    return null;
  }

  const registeredStudents = selectedClass.registeredStudentIds
    .filter(id => !selectedClass.actualStudentIds.includes(id))
    .map(id => students[id])
    .map(student => ({id: student.id, name: student.fullName} as StudentModel));

  return {
    students: registeredStudents
  } as RegisteredStudentsModel;
};

export const getAttendingStudents = (classesState: ClassesState, studentsState: StudentsState) => {
  const selectedClass = getSelectedClass(classesState);
  const students = getStudents(studentsState);

  if (!selectedClass || !students) {
    return null;
  }

  return selectedClass.actualStudentIds
    .map(id => students[id]);
};
