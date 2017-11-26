import { Class } from '../../../shared/state-models/class';

export interface ClassesState {
  classes: {
    [classId: number]: Class
  };
}
