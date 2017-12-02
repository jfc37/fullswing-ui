import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { Class } from '../../../shared/state-models/class';
export interface ClassesState extends LoadableState {
  classes: {
    [id: string]: Class
  };

  selectedId?: number;
}
