import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Pass } from '../../../shared/state-models/pass';
export interface CurrentPassesState extends LoadableState {
  passes: Pass[];
}


