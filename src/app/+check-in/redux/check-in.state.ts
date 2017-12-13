import { StudentCheckInState } from './student-check-in/student-check-in.state';
import { PassesState } from './passes/passes.state';
import { ClassesState } from './classes/classes.state';
import { StudentsState } from './students/students.state';
import { PassPurchaseState } from './pass-purchase/pass-purchase.state';
import { PassTemplatesState } from './pass-templates/pass-templates.state';
import { StudentSearchState } from './student-search/student-search.state';
import { StudentEnrolState } from './student-enrol/student-enrol.state';

export interface CheckInState {
  classes: ClassesState;
  students: StudentsState;
  passes: PassesState;
  studentCheckIn: StudentCheckInState;
  passPurchase: PassPurchaseState;
  passTemplates: PassTemplatesState;
  studentSearch: StudentSearchState;
  studentEnrol: StudentEnrolState;
}
