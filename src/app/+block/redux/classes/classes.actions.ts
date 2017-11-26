import { Class } from '../../../shared/state-models/class';
import { Action } from '@ngrx/store';

export const SET_CLASSES = '[Class] Set';

export class SetClasses implements Action {
  public readonly type = SET_CLASSES;
  constructor(public classes: Class[]) { }
}

export type Actions
  = SetClasses;
