import { Action } from '@ngrx/store';

export const INITIALISE_SELECTED_BLOCKS = '[Selected Blocks] Initialise';
export const TOGGLE_BLOCK_SELECTION = '[Selected Blocks] Toggle';
export const ENROL_IN_SELECTED_BLOCKS_REQUEST = '[Selected Blocks] Enrol';
export const ENROL_IN_SELECTED_BLOCKS_SUCCESS = '[Selected Blocks] Enrol Success';
export const ENROL_IN_SELECTED_BLOCKS_FAILURE = '[Selected Blocks] Enrol Failure';


export class InitialiseSelectedBlocks implements Action {
  public readonly type = INITIALISE_SELECTED_BLOCKS;
}

export class ToggleBlockSelection implements Action {
  public readonly type = TOGGLE_BLOCK_SELECTION;

  constructor(public id: number) { }
}

export class EnrolInSelectedBlocksRequest implements Action {
  public readonly type = ENROL_IN_SELECTED_BLOCKS_REQUEST;
}

export class EnrolInSelectedBlocksSuccess implements Action {
  public readonly type = ENROL_IN_SELECTED_BLOCKS_SUCCESS;
}

export class EnrolInSelectedBlocksFailure implements Action {
  public readonly type = ENROL_IN_SELECTED_BLOCKS_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = InitialiseSelectedBlocks
  | ToggleBlockSelection
  | EnrolInSelectedBlocksRequest
  | EnrolInSelectedBlocksSuccess
  | EnrolInSelectedBlocksFailure;
