import { Class } from '../../../shared/state-models/class';
import { LoadableState } from '../../../shared/redux/loadable/loadable.state';

export interface UpcomingSchedulesState extends LoadableState {
  classes: Class[];
}

