import { EnrolableBlocksState } from './enrolable-blocks.state';
import { BlockEnrolmentModel, GroupedBlocksModel, BlockModel } from '../../components/block-enrolment/block-enrolment.component.model';
import * as moment from 'moment';

export const getBlockEnrolmentModel = (state: EnrolableBlocksState) => {
  if (!state) {
    return null;
  }

  const groupedBlocks = Object.values(state.blocks)
    .reduce((accum, block) => {
      const day = moment(block.startDate).format('dddd, MMMM Do');
      return [
        ...accum.filter(x => x.startingOn !== day),
        {
          startingOn: day,
          blocks: [
            ...accum.filter(x => x.startingOn === day).map(x => x.blocks),
            {
              id: block.id,
              isRegistered: block.isAlreadyRegistered,
              name: block.name,
              spacesLeft: block.spacesAvailable,
              startTime: moment(block.startDate).format('h:mmA'),
              endTime: moment(block.startDate).add(block.minutesPerClass, 'minutes').format('h:mmA'),
            } as BlockModel
          ]
        } as GroupedBlocksModel
      ];
    }, []);

  return {
    isLoading: !state.hasLoaded,
    hasError: !!state.loadError,
    groupedBlocks
  } as BlockEnrolmentModel;
};
