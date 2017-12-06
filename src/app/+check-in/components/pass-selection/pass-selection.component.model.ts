import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';
export interface PassSelectionModel extends LoadableModel {
  passes: PassOption[];
}

export interface PassOption {
  id: number;
  description: string;
  cost: number;
}
