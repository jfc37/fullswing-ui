import { Block } from '../../../shared/state-models/block';
import { Action } from '@ngrx/store';

export const RESET_BLOCK_SUMMARIES = '[Block Summary] Reset';

export const LOAD_BLOCK_SUMMARIES_REQUEST = '[Block Summary] Load Request';
export const LOAD_BLOCK_SUMMARIES_SUCCESS = '[Block Summary] Load Success';
export const LOAD_BLOCK_SUMMARIES_FAILURE = '[Block Summary] Load Failure';

export class ResetBlockSummaries implements Action {
  public readonly type = RESET_BLOCK_SUMMARIES;
}

export class LoadBlockSummariesRequest implements Action {
  public readonly type = LOAD_BLOCK_SUMMARIES_REQUEST;
}

export class LoadBlockSummariesSuccess implements Action {
  public readonly type = LOAD_BLOCK_SUMMARIES_SUCCESS;

  constructor(public blocks: Block[]) { }
}

export class LoadBlockSummariesFailure implements Action {
  public readonly type = LOAD_BLOCK_SUMMARIES_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = ResetBlockSummaries
  | LoadBlockSummariesRequest
  | LoadBlockSummariesSuccess
  | LoadBlockSummariesFailure;

