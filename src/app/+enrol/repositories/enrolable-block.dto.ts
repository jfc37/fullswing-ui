import { BlockDto, dtoToBlock } from '../../shared/repositories/block.dto';
import { EnrolableBlock } from '../redux/enrolable-blocks/enrolable-blocks.state';
export interface EnrolableBlockDto extends BlockDto {
  isAlreadyRegistered: boolean;
  spacesAvailable: number;
}

export function dtoToEnrolableBlock(dto: EnrolableBlockDto): EnrolableBlock {
  return {
    ...dtoToBlock(dto),
    isAlreadyRegistered: dto.isAlreadyRegistered,
    spacesAvailable: dto.spacesAvailable
  };
}
