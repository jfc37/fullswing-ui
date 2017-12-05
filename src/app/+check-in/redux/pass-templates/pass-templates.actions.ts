import { Action } from '@ngrx/store';
import { PassTemplateSummary } from '../../../shared/state-models/pass-template';

export const INITIALISE_PASS_TEMPLATES = '[Pass Template] Initialise';

export const LOAD_PASS_TEMPLATES_REQUEST = '[Pass Template] Load Request';
export const LOAD_PASS_TEMPLATES_SUCCESS = '[Pass Template] Load Success';
export const LOAD_PASS_TEMPLATES_FAILURE = '[Pass Template] Load Failure';

export class InitialisePassTemplates implements Action {
  public readonly type = INITIALISE_PASS_TEMPLATES;
}

export class LoadPassTemplatesRequest implements Action {
  public readonly type = LOAD_PASS_TEMPLATES_REQUEST;
}

export class LoadPassTemplatesSuccess implements Action {
  public readonly type = LOAD_PASS_TEMPLATES_SUCCESS;

  constructor(public passTemplates: PassTemplateSummary[]) { }
}

export class LoadPassTemplatesFailure implements Action {
  public readonly type = LOAD_PASS_TEMPLATES_FAILURE;

  constructor(public error: string) { }
}

export type Actions
  = InitialisePassTemplates
  | LoadPassTemplatesRequest
  | LoadPassTemplatesSuccess
  | LoadPassTemplatesFailure;
