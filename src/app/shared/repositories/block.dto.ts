import { Block } from '../state-models/block';

export interface BlockDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  classCapacity: number;
  numberOfClasses: number;
  minutesPerClass: number;
  isInviteOnly: boolean;
}

export function dtoToBlock(dto: BlockDto): Block {
  return {
    id: dto.id,
    classCapacity: dto.classCapacity,
    name: dto.name,
    startDate: new Date(dto.startDate),
    endDate: new Date(dto.endDate),
    isInviteOnly: dto.isInviteOnly,
    minutesPerClass: dto.minutesPerClass,
    numberOfClasses: dto.numberOfClasses,
  };
}
