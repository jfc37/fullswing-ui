import { dtoToPass, PassDto, validateDtoPass } from './pass.dto';
import { ineeda } from 'ineeda';
describe('PassDto', () => {
  describe('dtoToPass', () => {

    [
      {
        name: 'clipsRemaining',
        dtoValue: 4,
        expectedValue: 4
      },
      {
        name: 'id',
        dtoValue: 54,
        expectedValue: 54
      },
      {
        name: 'createdDateTime',
        dtoValue: '2015-11-30T07:30:15',
        expectedValue: new Date('2015-11-30T07:30:15')
      },
      {
        name: 'startDate',
        dtoValue: '2015-11-30T00:00:00+00:00',
        expectedValue: new Date('2015-11-30T00:00:00+00:00')
      },
      {
        name: 'endDate',
        dtoValue: '2015-11-30T00:00:00+00:00',
        expectedValue: new Date('2015-11-30T00:00:00+00:00')
      },
      {
        name: 'passType',
        dtoValue: 'Clip',
        expectedValue: 'clip'
      },
      {
        name: 'passNumber',
        dtoValue: 644345,
        expectedValue: 644345
      },
      {
        name: 'cost',
        dtoValue: 90,
        expectedValue: 90
      },
      {
        name: 'description',
        dtoValue: '6 week unlimited',
        expectedValue: '6 week unlimited'
      },
      {
        name: 'valid',
        dtoValue: true,
        expectedValue: true
      },
    ].forEach(data => {
      it(`should map ${data.name}`, () => {
        const dto = ineeda<PassDto>({
          passType: '',
          [data.name]: data.dtoValue
         });

        const pass = dtoToPass(dto);

        expect(pass[data.name]).toEqual(data.expectedValue);
      });
    });
  });

  describe('validateDtoPass', () => {
    it(`should throw when pass type isn't 'clip' or 'unlimited'`, () => {
      const dto = ineeda<PassDto>({ passType: 'unknown' });

      expect(() => validateDtoPass(dto)).toThrowError();
    });
  });
});
