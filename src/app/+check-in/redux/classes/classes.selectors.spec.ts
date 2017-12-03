import { User } from '../../../shared/state-models/teacher';
import { Class } from '../../../shared/state-models/class';
import { StudentsState } from '../students/students.state';
import { ClassesState } from './classes.state';
import { ineeda } from 'ineeda';
import { getUnattendingRegisteredStudents, getAttendingStudents } from './classes.selectors';
describe('Classes Selectors', () => {
  describe('getUnattendingRegisteredStudents', () => {
    let studentsState: StudentsState;
    let classesState: ClassesState;

    beforeEach(() => {
      studentsState = ineeda<StudentsState>();
      classesState = ineeda<ClassesState>({
        selectedId: 1,
        classes: {
          [1]: ineeda<Class>({
            actualStudentIds: [],
            registeredStudentIds: [],
          })
        }
      });
    });

    it(`should be null when classess state is null`, () => {
      classesState = null;

      const registeredStudents = getUnattendingRegisteredStudents(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const registeredStudents = getUnattendingRegisteredStudents(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be empty when no registered students`, () => {
      classesState.classes[1].registeredStudentIds = [];

      const registeredStudents = getUnattendingRegisteredStudents(classesState, studentsState);

      expect(registeredStudents).toEqual([]);
    });

    it(`should be include registered students`, () => {
      const expectedStudent = ineeda<User>({id: 2});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].registeredStudentIds = [2];

      const registeredStudents = getUnattendingRegisteredStudents(classesState, studentsState);

      expect(registeredStudents).toEqual([expectedStudent]);
    });

    it(`should be exclude registered students marked as attending`, () => {
      const expectedStudent = ineeda<User>({id: 2});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].registeredStudentIds = [2];
      classesState.classes[1].actualStudentIds = [2];

      const registeredStudents = getUnattendingRegisteredStudents(classesState, studentsState);
      expect(registeredStudents).toEqual([]);
    });
  });

  describe('getAttendingStudents', () => {
    let studentsState: StudentsState;
    let classesState: ClassesState;

    beforeEach(() => {
      studentsState = ineeda<StudentsState>();
      classesState = ineeda<ClassesState>({
        selectedId: 1,
        classes: {
          [1]: ineeda<Class>({
            actualStudentIds: [],
            registeredStudentIds: [],
          })
        }
      });
    });

    it(`should be null when classess state is null`, () => {
      classesState = null;

      const registeredStudents = getAttendingStudents(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const registeredStudents = getAttendingStudents(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be empty when no attending students`, () => {
      classesState.classes[1].registeredStudentIds = [];

      const registeredStudents = getAttendingStudents(classesState, studentsState);

      expect(registeredStudents).toEqual([]);
    });

    it(`should be include attending students`, () => {
      const expectedStudent = ineeda<User>({id: 2});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].actualStudentIds = [2];

      const registeredStudents = getAttendingStudents(classesState, studentsState);

      expect(registeredStudents).toEqual([expectedStudent]);
    });
  });
});
