import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Pass } from '../../../shared/state-models/pass';

export interface PassesState extends LoadableState {
  passes: {
    [studentId: string]: Pass[];
  };
}
