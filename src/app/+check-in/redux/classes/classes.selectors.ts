import {
  RegisteredStudentsModel,
  StudentModel,
} from '../../components/registered-students/registered-students.component.model';
import { Class } from '../../../shared/state-models/class';
import { ClassesState } from './classes.state';
import { StudentsState } from '../students/students.state';
import { AttendingStudentsModel } from '../../components/attending-students/attending-students.component.model';

export const getSelectedClass = (state: ClassesState, classId: number) =>
  !!state && state.classes[classId];

export const getStudents = (state: StudentsState) => !!state && state.students;


export const getRegisteredStudentsModel = (selectedClass: Class, studentsState: StudentsState) => {
  const students = getStudents(studentsState);

  if (!selectedClass || !students) {
    return null;
  }

  const registeredStudents = selectedClass.registeredStudentIds
    .filter(id => !selectedClass.actualStudentIds.includes(id))
    .map(id => students[id])
    .map(student => ({ id: student.id, name: student.fullName } as StudentModel));

  return {
    students: registeredStudents
  } as RegisteredStudentsModel;
};

export const getAttendingStudentsModel = (selectedClass: Class, studentsState: StudentsState) => {
  const students = getStudents(studentsState);

  if (!selectedClass || !students) {
    return null;
  }

  const attendingStudents = selectedClass.actualStudentIds
    .map(id => students[id])
    .map(student => ({ id: student.id, name: student.fullName } as StudentModel));

  return {
    students: attendingStudents
  } as AttendingStudentsModel;
};
