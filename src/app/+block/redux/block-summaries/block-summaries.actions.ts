import { Block } from '../../../shared/state-models/block';
import { Action } from '@ngrx/store';

export const RESET_BLOCK_SUMMARIES = '[Block Summary] Reset';

export const LOAD_BLOCK_SUMMARIES_REQUEST = '[Block Summary] Load Request';
export const LOAD_BLOCK_SUMMARIES_SUCCESS = '[Block Summary] Load Success';
export const LOAD_BLOCK_SUMMARIES_FAILURE = '[Block Summary] Load Failure';

export const ADD_BLOCK_SUMMARIES = '[Block Summary] Add';

export const DELETE_BLOCK_SUMMARIES_REQUEST = '[Block Summary] Delete Request';
export const DELETE_BLOCK_SUMMARIES_SUCCESS = '[Block Summary] Delete Success';
export const DELETE_BLOCK_SUMMARIES_FAILURE = '[Block Summary] Delete Failure';

export const GENERATE_BLOCK_SUMMARIES_REQUEST = '[Block Summary] Generate Request';
export const GENERATE_BLOCK_SUMMARIES_SUCCESS = '[Block Summary] Generate Success';
export const GENERATE_BLOCK_SUMMARIES_FAILURE = '[Block Summary] Generate Failure';

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

export class DeleteBlockSummariesRequest implements Action {
  public readonly type = DELETE_BLOCK_SUMMARIES_REQUEST;

  constructor(public id: number) { }
}

export class DeleteBlockSummariesSuccess implements Action {
  public readonly type = DELETE_BLOCK_SUMMARIES_SUCCESS;

  constructor(public id: number) { }
}

export class DeleteBlockSummariesFailure implements Action {
  public readonly type = DELETE_BLOCK_SUMMARIES_FAILURE;

  constructor(public id: number, public error: string) { }
}

export class AddBlockSummaries implements Action {
  public readonly type = ADD_BLOCK_SUMMARIES;

  constructor(public block: Block) { }
}

export class GenerateBlockSummariesRequest implements Action {
  public readonly type = GENERATE_BLOCK_SUMMARIES_REQUEST;

  constructor(public id: number) { }
}

export class GenerateBlockSummariesSuccess implements Action {
  public readonly type = GENERATE_BLOCK_SUMMARIES_SUCCESS;

  constructor(public id: number) { }
}

export class GenerateBlockSummariesFailure implements Action {
  public readonly type = GENERATE_BLOCK_SUMMARIES_FAILURE;

  constructor(public id: number, public error: string) { }
}

export type Actions
  = ResetBlockSummaries
  | LoadBlockSummariesRequest
  | LoadBlockSummariesSuccess
  | LoadBlockSummariesFailure
  | DeleteBlockSummariesRequest
  | DeleteBlockSummariesSuccess
  | DeleteBlockSummariesFailure
  | AddBlockSummaries
  | GenerateBlockSummariesRequest
  | GenerateBlockSummariesSuccess
  | GenerateBlockSummariesFailure;

