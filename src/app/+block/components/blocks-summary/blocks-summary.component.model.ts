import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';
export interface BlocksSummaryModel extends LoadableModel {
  blocks: BlockSummaryModel[];
}

export interface BlockSummaryModel {
  id: number;
  name: string;
  startDate: Date;
  firstClassDate: string;
  lastClassDate: string;
  day: string;
  time: string;
  detailsRoute: string;
  classListRoute: string;
  disableDelete: boolean;
  disableGenerate: boolean;
}
