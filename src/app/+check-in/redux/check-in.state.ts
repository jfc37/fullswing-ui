import { PassesState } from './passes/passes.state';
import { ClassesState } from './classes/classes.state';
import { StudentsState } from './students/students.state';
import { CurrentStudentState } from './current-student/current-student.state';

export interface CheckInState {
  classes: ClassesState;
  students: StudentsState;
  passes: PassesState;
  currentStudent: CurrentStudentState;
}
