import { Teacher } from '../../../shared/state-models/teacher';
import { LoadableState } from '../../../shared/redux/loadable/loadable.state';

export interface TeachersState extends LoadableState {
  teachers: {
    [id: number]: Teacher
  };
}
