import { User } from '../../../shared/state-models/teacher';
import { LoadableState } from '../../../shared/redux/loadable/loadable.state';

export interface StudentSearchState extends LoadableState {
  searchText: string;
  searchResults: User[];
}
