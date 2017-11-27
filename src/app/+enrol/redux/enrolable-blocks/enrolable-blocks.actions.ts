import { Action } from '@ngrx/store';
import { EnrolableBlock } from './enrolable-blocks.state';

export const INITIALISE_BLOCK_ENROLMENT = '[Enrolable Blocks] Initialise';

export const LOAD_ENROLABLE_BLOCKS_REQUEST = '[Enrolable Blocks] Load Request';
export const LOAD_ENROLABLE_BLOCKS_SUCCESS = '[Enrolable Blocks] Load Success';
export const LOAD_ENROLABLE_BLOCKS_FAILURE = '[Enrolable Blocks] Load Failure';

export class InitialiseBlockEnrolment implements Action {
  public readonly type = INITIALISE_BLOCK_ENROLMENT;
}

export class LoadEnrolableBlocksRequest implements Action {
  public readonly type = LOAD_ENROLABLE_BLOCKS_REQUEST;
}

export class LoadEnrolableBlocksSuccess implements Action {
  public readonly type = LOAD_ENROLABLE_BLOCKS_SUCCESS;

  constructor(public blocks: EnrolableBlock[]) { }
}

export class LoadEnrolableBlocksFailure implements Action {
  public readonly type = LOAD_ENROLABLE_BLOCKS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = InitialiseBlockEnrolment
  | LoadEnrolableBlocksRequest
  | LoadEnrolableBlocksSuccess
  | LoadEnrolableBlocksFailure;
