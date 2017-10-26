import { Teacher } from '../state-models/teacher';
export interface TeacherDto {
  id: number;
  firstName: string;
  surname: string;
  fullName: string;
}

export function dtoToTeacher(dto: TeacherDto): Teacher {
  return {
    id: dto.id,
    firstName: dto.firstName,
    surname: dto.surname,
    fullName: dto.fullName,
  } as Teacher;
}
