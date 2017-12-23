import { SavableState } from '../../../shared/redux/savable/savable.state';
export interface NewStudentState extends SavableState {
  student: StudentDetails;
}

export interface StudentDetails {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}
