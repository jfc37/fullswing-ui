import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';

export interface CurrentPassesModel extends LoadableModel {
  passes: PassModel[];
}

export interface PassModel {
  type: string;
  expiry: Date;
  additionalInfo: string;
}
