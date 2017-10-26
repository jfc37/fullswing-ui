import { Block } from '../../../shared/state-models/block';
import { Action } from '@ngrx/store';

export const RESET_DRAFT_BLOCK = '[Draft Block] Reset';
export const SET_SELECTED_DRAFT_BLOCK_ID = '[Draft Block] Set Selected Id';

export const LOAD_DRAFT_BLOCK_REQUEST = '[Draft Block] Load Request';
export const LOAD_DRAFT_BLOCK_SUCCESS = '[Draft Block] Load Success';
export const LOAD_DRAFT_BLOCK_FAILURE = '[Draft Block] Load Failure';

export const UPDATE_SELECTED_DRAFT_BLOCK = '[Draft Block] Update Selected Block';

export const SAVE_SELECTED_DRAFT_BLOCK_REQUEST = '[Draft Block] Save Selected Block Request';
export const SAVE_SELECTED_DRAFT_BLOCK_SUCCESS = '[Draft Block] Save Selected Block Success';
export const SAVE_SELECTED_DRAFT_BLOCK_FAILURE = '[Draft Block] Save Selected Block Failure';

export class ResetDraftBlock implements Action {
  public readonly type = RESET_DRAFT_BLOCK;
}

export class SetSelectedDraftBlockId implements Action {
  public readonly type = SET_SELECTED_DRAFT_BLOCK_ID;
  constructor(public id: number) { }
}

export class LoadDraftBlockRequest implements Action {
  public readonly type = LOAD_DRAFT_BLOCK_REQUEST;
  constructor(public id: number) { }
}

export class LoadDraftBlockSuccess implements Action {
  public readonly type = LOAD_DRAFT_BLOCK_SUCCESS;

  constructor(public block: Block) { }
}

export class LoadDraftBlockFailure implements Action {
  public readonly type = LOAD_DRAFT_BLOCK_FAILURE;

  constructor(public error: string) { }
}

export class UpdateSelectedDraftBlock implements Action {
  public readonly type = UPDATE_SELECTED_DRAFT_BLOCK;

  constructor(public block: Block) { }
}

export class SaveSelectedDraftBlockRequest implements Action {
  public readonly type = SAVE_SELECTED_DRAFT_BLOCK_REQUEST;
}

export class SaveSelectedDraftBlockSuccess implements Action {
  public readonly type = SAVE_SELECTED_DRAFT_BLOCK_SUCCESS;
}

export class SaveSelectedDraftBlockFailure implements Action {
  public readonly type = SAVE_SELECTED_DRAFT_BLOCK_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetDraftBlock
  | SetSelectedDraftBlockId
  | LoadDraftBlockRequest
  | LoadDraftBlockSuccess
  | LoadDraftBlockFailure
  | UpdateSelectedDraftBlock
  | SaveSelectedDraftBlockRequest
  | SaveSelectedDraftBlockSuccess
  | SaveSelectedDraftBlockFailure;
