import { Class } from '../state-models/class';
export interface ClassDto {
  id: number;
  name: string;
  classCapacity: number;
  startTime: string;
  endTime: string;
}

export function dtoToClass(dto: ClassDto): Class {
  return {
    id: dto.id,
    classCapacity: dto.classCapacity,
    name: dto.name,
    startTime: new Date(dto.startTime),
    endTime: new Date(dto.endTime),
  } as Class;
}
