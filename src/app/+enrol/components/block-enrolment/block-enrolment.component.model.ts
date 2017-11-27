import { LoadableModel } from '../../../shared/components/loadable/loadable.component.model';

export interface BlockEnrolmentModel extends LoadableModel {
  groupedBlocks: GroupedBlocksModel[];
}

export interface GroupedBlocksModel {
  startingOn: string;
  blocks: BlockModel[];
}

export interface BlockModel {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  isRegistered: boolean;
  spacesLeft: number;
}
