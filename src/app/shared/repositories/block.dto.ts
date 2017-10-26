import { Block } from '../state-models/block';
import * as moment from 'moment';

export interface BlockDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  classCapacity: number;
  numberOfClasses: number;
  minutesPerClass: number;
  isInviteOnly: boolean;
  teachers: {
    id: number;
  }[];
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
    teachers: (dto.teachers || []).map(teacher => teacher.id)
  };
}

export function blockToDto(block: Block): BlockDto {
  return {
    id: block.id,
    classCapacity: block.classCapacity,
    name: block.name,
    startDate: moment(block.startDate).toISOString(),
    endDate: moment(block.endDate).toISOString(),
    isInviteOnly: block.isInviteOnly,
    minutesPerClass: block.minutesPerClass,
    numberOfClasses: block.numberOfClasses,
    teachers: (block.teachers || []).map(id => ({id}))
  };
}
