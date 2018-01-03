import { LoadableState } from '../../../shared/redux/loadable/loadable.state';
import { PassTemplateSummary } from '../../../shared/state-models/pass-template';

export interface PassTemplatesState extends LoadableState {
  passTemplates: {
    [id: string]: PassTemplateSummary;
  };
}
