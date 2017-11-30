import { SavableState } from './savable.state';

export function getInitialSavableState<T extends SavableState>(): T {
  return {
    isSaving: false,
    hasSaved: false,
    saveError: null,
  } as T;
}

export function getSavingState<T extends SavableState>(state: T): T {
  return Object.assign({}, state, {
    isSaving: true,
    hasSaved: false,
    saveError: null,
  });
}

export function getSaveSuccessState<T extends SavableState>(state: T): T {
  return Object.assign({}, state, {
    isSaving: false,
    hasSaved: true,
    saveError: null,
  });
}

export function getSaveFailureState<T extends SavableState>(state: T, error: string): T {
  return Object.assign({}, state, {
    isSaving: false,
    hasSaved: false,
    saveError: error,
  });
}
