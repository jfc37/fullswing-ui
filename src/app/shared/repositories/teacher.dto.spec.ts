import { TeacherDto, dtoToTeacher } from './teacher.dto';
import { ineeda } from 'ineeda';

describe('dtoToTeacher', () => {
  [
    'id',
    'firstName',
    'surname',
    'fullName',
  ].forEach(name => {
    it(`should map ${name}`, () => {
      const dto = ineeda<TeacherDto>();
      const teacher = dtoToTeacher(dto);
      expect(teacher[name]).toBe(dto[name]);
    });
  });
});
