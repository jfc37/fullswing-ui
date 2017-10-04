export interface LoadableState {
  isLoading: boolean;
  hasLoaded: boolean;
  loadError: string;
}

export const getHasLoaded = (state: LoadableState) => state.hasLoaded;

export const getHasLoadingError = (state: LoadableState) => Boolean(state.loadError);
