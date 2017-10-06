import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';
export interface BlocksSummaryModel extends LoadableModel {
  blocks: BlockSummaryModel[];
}

export interface BlockSummaryModel {
  name: string;
  firstClassDate: string;
  lastClassDate: string;
  day: string;
  time: string;
  detailsRoute: string;
}
