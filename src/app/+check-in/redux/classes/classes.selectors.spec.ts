import { User } from '../../../shared/state-models/teacher';
import { Class } from '../../../shared/state-models/class';
import { StudentsState } from '../students/students.state';
import { ClassesState } from './classes.state';
import { ineeda } from 'ineeda';
import { getRegisteredStudentsModel, getAttendingStudentsModel } from './classes.selectors';
describe('Classes Selectors', () => {
  describe('getRegisteredStudentsModel', () => {
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

      const registeredStudents = getRegisteredStudentsModel(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const registeredStudents = getRegisteredStudentsModel(classesState, studentsState);

      expect(registeredStudents).toBeNull();
    });

    it(`should be empty when no registered students`, () => {
      classesState.classes[1].registeredStudentIds = [];

      const model = getRegisteredStudentsModel(classesState, studentsState);

      expect(model.students).toEqual([]);
    });

    it(`should be include registered students`, () => {
      const expectedStudent = ineeda<User>({id: 2, fullName: 'name'});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].registeredStudentIds = [2];

      const model = getRegisteredStudentsModel(classesState, studentsState);

      expect(model.students.length).toBe(1);
      expect(model.students[0].id).toBe(expectedStudent.id);
      expect(model.students[0].name).toBe(expectedStudent.fullName);
    });

    it(`should be exclude registered students marked as attending`, () => {
      const expectedStudent = ineeda<User>({id: 2});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].registeredStudentIds = [2];
      classesState.classes[1].actualStudentIds = [2];

      const model = getRegisteredStudentsModel(classesState, studentsState);
      expect(model.students).toEqual([]);
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

      const model = getAttendingStudentsModel(classesState, studentsState);

      expect(model).toBeNull();
    });

    it(`should be null when students state is null`, () => {
      studentsState = null;

      const model = getAttendingStudentsModel(classesState, studentsState);

      expect(model).toBeNull();
    });

    it(`should be empty when no attending students`, () => {
      classesState.classes[1].registeredStudentIds = [];

      const model = getAttendingStudentsModel(classesState, studentsState);

      expect(model.students).toEqual([]);
    });

    it(`should be include attending students`, () => {
      const expectedStudent = ineeda<User>({id: 2, fullName: 'full name'});
      studentsState.students[2] = expectedStudent;
      classesState.classes[1].actualStudentIds = [2];

      const model = getAttendingStudentsModel(classesState, studentsState);

      expect(model.students.length).toBe(1);
      expect(model.students[0].id).toBe(expectedStudent.id);
      expect(model.students[0].name).toBe(expectedStudent.fullName);
    });
  });
});
