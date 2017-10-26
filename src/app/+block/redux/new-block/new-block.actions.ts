import { Block } from '../../../shared/state-models/block';
import { Action } from '@ngrx/store';

export const RESET_NEW_BLOCK = '[New Block] Reset';

export const UPDATE_NEW_BLOCK = '[New Block] Update New Block';

export const CREATE_BLOCK_REQUEST = '[New Block] Save Selected Block Request';
export const CREATE_BLOCK_SUCCESS = '[New Block] Save Selected Block Success';
export const CREATE_BLOCK_FAILURE = '[New Block] Save Selected Block Failure';

export class ResetNewBlock implements Action {
  public readonly type = RESET_NEW_BLOCK;
}

export class UpdateNewBlock implements Action {
  public readonly type = UPDATE_NEW_BLOCK;

  constructor(public block: Block) { }
}

export class CreateBlockRequest implements Action {
  public readonly type = CREATE_BLOCK_REQUEST;
}

export class CreateBlockSuccess implements Action {
  public readonly type = CREATE_BLOCK_SUCCESS;
}

export class CreateBlockFailure implements Action {
  public readonly type = CREATE_BLOCK_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetNewBlock
  | UpdateNewBlock
  | CreateBlockRequest
  | CreateBlockSuccess
  | CreateBlockFailure;
