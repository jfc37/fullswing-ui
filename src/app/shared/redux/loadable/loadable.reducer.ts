import { LoadableState } from './loadable.state';

export function getInitialLoadableState<T extends LoadableState>(): T {
  return {
    isLoading: false,
    hasLoaded: false,
    loadError: null,
  } as T;
}

export function getLoadingState<T extends LoadableState>(state: T): T {
  return Object.assign({}, state, {
    isLoading: true,
    loadError: null,
  });
}

export function getLoadSuccessState<T extends LoadableState>(state: T): T {
  return Object.assign({}, state, {
    isLoading: false,
    hasLoaded: true,
    loadError: null,
  });
}

export function getLoadFailureState<T extends LoadableState>(state: T, error: string): T {
  return Object.assign({}, state, {
    isLoading: false,
    hasLoaded: true,
    loadError: error,
  });
}
