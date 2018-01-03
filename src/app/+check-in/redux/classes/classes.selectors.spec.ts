import { User } from '../../../shared/state-models/teacher';
import { Class } from '../../../shared/state-models/class';
import { StudentsState } from '../students/students.state';
import { ClassesState } from './classes.state';
import { ineeda } from 'ineeda';
import { getRegisteredStudentsModel, getAttendingStudentsModel } from './classes.selectors';
describe('Classes Selectors', () => {
  describe('getRegisteredStudentsModel', () => {
    let studentsState: StudentsState;
    let selectedClass: Class;

    beforeEach(() => {
      studentsState = ineeda<StudentsState>();
      selectedClass = ineeda<Class>({
        actualStudentIds: [],
        registeredStudentIds: [],
      });
    });

    it(`should be null when classess state is null`, () => {
      selectedClass = null;

      const registeredStudents = getRegisteredStudentsModel(selectedClass, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const registeredStudents = getRegisteredStudentsModel(selectedClass, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be empty when no registered students`, () => {
      selectedClass.registeredStudentIds = [];

      const model = getRegisteredStudentsModel(selectedClass, studentsState);

      expect(model.students).toEqual([]);
    });

    it(`should be include registered students`, () => {
      const expectedStudent = ineeda<User>({id: 2, fullName: 'name'});
      studentsState.students[2] = expectedStudent;
      selectedClass.registeredStudentIds = [2];

      const model = getRegisteredStudentsModel(selectedClass, studentsState);

      expect(model.students.length).toBe(1);
      expect(model.students[0].id).toBe(expectedStudent.id);
      expect(model.students[0].name).toBe(expectedStudent.fullName);
    });

    it(`should be exclude registered students marked as attending`, () => {
      const expectedStudent = ineeda<User>({id: 2});
      studentsState.students[2] = expectedStudent;
      selectedClass.registeredStudentIds = [2];
      selectedClass.actualStudentIds = [2];

      const model = getRegisteredStudentsModel(selectedClass, studentsState);
      expect(model.students).toEqual([]);
    });
  });

  describe('getAttendingStudents', () => {
    let studentsState: StudentsState;
    let selectedClass: Class;

    beforeEach(() => {
      studentsState = ineeda<StudentsState>();
      selectedClass = ineeda<Class>({
        actualStudentIds: [],
        registeredStudentIds: [],
      });
    });

    it(`should be null when classess state is null`, () => {
      selectedClass = null;

      const model = getAttendingStudentsModel(selectedClass, studentsState);

      expect(model).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const model = getAttendingStudentsModel(selectedClass, studentsState);

      expect(model).toBeNull();
    });

    it(`should be empty when no attending students`, () => {
      selectedClass.registeredStudentIds = [];

      const model = getAttendingStudentsModel(selectedClass, studentsState);

      expect(model.students).toEqual([]);
    });

    it(`should be include attending students`, () => {
      const expectedStudent = ineeda<User>({id: 2, fullName: 'full name'});
      studentsState.students[2] = expectedStudent;
      selectedClass.actualStudentIds = [2];

      const model = getAttendingStudentsModel(selectedClass, studentsState);

      expect(model.students.length).toBe(1);
      expect(model.students[0].id).toBe(expectedStudent.id);
      expect(model.students[0].name).toBe(expectedStudent.fullName);
    });
  });
});
