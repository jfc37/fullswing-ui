import { ClassesState } from './classes/classes.state';
import { StudentsState } from './students/students.state';

export interface CheckInState {
  classes: ClassesState;
  students: StudentsState;
}
