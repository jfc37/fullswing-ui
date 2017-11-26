import { Class } from '../../../shared/state-models/class';
import { Action } from '@ngrx/store';

export const SET_SELECTED_BLOCK_ID = '[Block Class] Set Selected Id';

export const LOAD_BLOCK_CLASSES_REQUEST = '[Block Class] Load Request';
export const LOAD_BLOCK_CLASSES_SUCCESS = '[Block Class] Load Success';
export const LOAD_BLOCK_CLASSES_FAILURE = '[Block Class] Load Failure';

export class SetSelectedBlockId implements Action {
  public readonly type = SET_SELECTED_BLOCK_ID;
  constructor(public id: number) { }
}

export class LoadBlockClassesRequest implements Action {
  public readonly type = LOAD_BLOCK_CLASSES_REQUEST;
  constructor(public id: number) { }
}

export class LoadBlockClassesSuccess implements Action {
  public readonly type = LOAD_BLOCK_CLASSES_SUCCESS;

  constructor(public blockId: number, public classIds: number[]) { }
}

export class LoadBlockClassesFailure implements Action {
  public readonly type = LOAD_BLOCK_CLASSES_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = SetSelectedBlockId
  | LoadBlockClassesRequest
  | LoadBlockClassesSuccess
  | LoadBlockClassesFailure;
