import { SavableState } from '../../../shared/redux/savable/savable.state';
export interface NewStudentState extends SavableState {
  student: StudentDetails;
  createdId: number;
}

export interface StudentDetails {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  agreesToTerms: boolean;
}
