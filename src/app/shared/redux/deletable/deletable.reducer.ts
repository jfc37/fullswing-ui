import { DeletableState } from './deletable.state';

export function getInitialDeletableState<T extends DeletableState>(): T {
  return {
    isDeleting: {},
    deleteError: {},
  } as T;
}

export function getDeletingState<T extends DeletableState>(state: T, id: number): T {
  return Object.assign({}, state, {
    isDeleting: Object.assign({}, state.isDeleting, {[id]: true}),
    deleteError: Object.assign({}, state.deleteError, {[id]: null}),
  });
}

export function getDeleteSuccessState<T extends DeletableState>(state: T, id: number): T {
  return Object.assign({}, state, {
    isDeleting: Object.assign({}, state.isDeleting, {[id]: false}),
    deleteError: Object.assign({}, state.deleteError, {[id]: null})
  });
}

export function getDeleteFailureState<T extends DeletableState>(state: T, id: number, error: string): T {
  return Object.assign({}, state, {
    isDeleting: Object.assign({}, state.isDeleting, {[id]: false}),
    deleteError: Object.assign({}, state.deleteError, {[id]: error}),
  });
}
