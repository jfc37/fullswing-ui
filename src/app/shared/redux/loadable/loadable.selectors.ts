import { LoadableState } from './loadable.state';

export const getHasLoaded = (state: LoadableState) => state && state.hasLoaded;
