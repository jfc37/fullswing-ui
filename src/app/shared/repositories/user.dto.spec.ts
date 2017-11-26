import { UserDto, dtoToUser } from './user.dto';
import { ineeda } from 'ineeda';

describe('dtoToUser', () => {
  [
    'id',
    'firstName',
    'surname',
    'fullName',
  ].forEach(name => {
    it(`should map ${name}`, () => {
      const dto = ineeda<UserDto>();
      const teacher = dtoToUser(dto);
      expect(teacher[name]).toBe(dto[name]);
    });
  });
});
