import { ClassDto, dtoToClass } from './class.dto';
import { ineeda } from 'ineeda';

describe('ClassDto', () => {
  describe('dtoToClass', () => {

    [
      {
        name: 'id',
        dtoValue: 54,
        expectedValue: 54
      },
      {
        name: 'startTime',
        dtoValue: '2015-11-30T00:00:00+00:00',
        expectedValue: new Date('2015-11-30T00:00:00+00:00')
      },
      {
        name: 'endTime',
        dtoValue: '2015-11-30T00:00:00+00:00',
        expectedValue: new Date('2015-11-30T00:00:00+00:00')
      },
      {
        name: 'classCapacity',
        dtoValue: 30,
        expectedValue: 30
      },
      {
        name: 'name',
        dtoValue: 'Class name',
        expectedValue: 'Class name'
      },
    ].forEach(data => {
      it(`should map ${data.name}`, () => {
        const dto = ineeda<ClassDto>({
          [data.name]: data.dtoValue
         });

        const theClass = dtoToClass(dto);

        expect(theClass[data.name]).toEqual(data.expectedValue);
      });
    });
  });
});
