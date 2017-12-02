import { UserDto } from './user.dto';
import { Class } from '../state-models/class';
export interface ClassDto {
  id: number;
  name: string;
  classCapacity: number;
  startTime: string;
  endTime: string;
  actualStudents: UserDto[];
  registeredStudents: UserDto[];
}

export function dtoToClass(dto: ClassDto): Class {
  return {
    id: dto.id,
    classCapacity: dto.classCapacity,
    name: dto.name,
    startTime: new Date(dto.startTime),
    endTime: new Date(dto.endTime),
    actualStudentIds: (dto.actualStudents || []).map(s => s.id),
    registeredStudentIds: (dto.registeredStudents || []).map(s => s.id)
  } as Class;
}
