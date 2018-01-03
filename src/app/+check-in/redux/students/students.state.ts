import { User } from '../../../shared/state-models/teacher';

export interface StudentsState {
  students: {
    [id: string]: User
  };
}
