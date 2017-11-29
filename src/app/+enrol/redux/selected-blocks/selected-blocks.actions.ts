import { Action } from '@ngrx/store';

export const INITIALISE_SELECTED_BLOCKS = '[Selected Blocks] Initialise';
export const TOGGLE_BLOCK_SELECTION = '[Selected Blocks] Toggle';

export class InitialiseSelectedBlocks implements Action {
  public readonly type = INITIALISE_SELECTED_BLOCKS;
}
export class ToggleBlockSelection implements Action {
  public readonly type = TOGGLE_BLOCK_SELECTION;

  constructor(public id: number) { }
}

export type Actions
  = InitialiseSelectedBlocks
  | ToggleBlockSelection;
