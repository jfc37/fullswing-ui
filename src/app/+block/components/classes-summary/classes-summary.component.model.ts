import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';
export interface ClassesSummaryModel extends LoadableModel {
  classes: ClassSummaryModel[];
}

export interface ClassSummaryModel {
  id: number;
  name: string;
  date: string;
  attendenceNumber: number;
  detailsRoute: string;
  checkInRoute: string;
}
