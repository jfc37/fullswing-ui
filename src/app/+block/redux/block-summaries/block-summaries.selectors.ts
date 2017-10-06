import { BLOCK_DETAILS_ROUTE } from '../../block.routes.constants';
import { BlockSummaryModel, BlocksSummaryModel } from '../../components/blocks-summary/blocks-summary.component.model';
import { BlockSummariesState } from './block-summaries.state';
import * as moment from 'moment';
export const getBlockSummariesModel = (state: BlockSummariesState) => {
  if (!state) {
    return null;
  }
  return {
    isLoading: !state.hasLoaded,
    hasError: !!state.loadError,
    blocks: state.blocks.map(block => ({
      name: block.name,
      firstClassDate: moment(block.startDate).format('DD MMM'),
      lastClassDate: moment(block.endDate).format('DD MMM'),
      day: moment(block.startDate).format('dddd'),
      time: moment(block.startDate).format('h:mm a'),
      detailsRoute: BLOCK_DETAILS_ROUTE.replace(':id', '' + block.id),
    } as BlockSummaryModel))
  } as BlocksSummaryModel;
};
