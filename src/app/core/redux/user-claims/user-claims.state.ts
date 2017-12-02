import { LoadableState } from '../../../shared/redux/loadable/loadable.state';

export interface UserClaimsState extends LoadableState {
  claims: string[];
}
