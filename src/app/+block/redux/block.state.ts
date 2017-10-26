import { NewBlockState } from './new-block/new-block.state';
import { DraftBlocksState } from './draft-blocks/draft-blocks.state';
import { BlockSummariesState } from './block-summaries/block-summaries.state';

export interface BlockState {
  blockSummaries: BlockSummariesState;
  draftBlocks: DraftBlocksState;
  newBlock: NewBlockState;
}
