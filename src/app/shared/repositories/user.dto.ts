import { User } from '../state-models/teacher';
export interface UserDto {
  id: number;
  firstName: string;
  surname: string;
  fullName: string;
}

export function dtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    firstName: dto.firstName,
    surname: dto.surname,
    fullName: dto.fullName,
  } as User;
}
