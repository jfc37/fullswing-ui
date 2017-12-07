import { PassesState } from './passes/passes.state';
import { ClassesState } from './classes/classes.state';
import { StudentsState } from './students/students.state';
import { PassPurchaseState } from './pass-purchase/pass-purchase.state';
import { PassTemplatesState } from './pass-templates/pass-templates.state';

export interface CheckInState {
  classes: ClassesState;
  students: StudentsState;
  passes: PassesState;
  passPurchase: PassPurchaseState;
  passTemplates: PassTemplatesState;
}
