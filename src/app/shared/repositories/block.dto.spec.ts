import { ineeda } from 'ineeda';
import { BlockDto, dtoToBlock } from './block.dto';

describe('BlockDto', () => {
  describe('dtoToBlock', () => {

    [
      {
        name: 'id',
        dtoValue: 54,
        expectedValue: 54
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
        name: 'classCapacity',
        dtoValue: 30,
        expectedValue: 30
      },
      {
        name: 'name',
        dtoValue: 'Class name',
        expectedValue: 'Class name'
      },
      {
        name: 'minutesPerClass',
        dtoValue: 55,
        expectedValue: 55
      },
      {
        name: 'isInviteOnly',
        dtoValue: true,
        expectedValue: true
      },
    ].forEach(data => {
      it(`should map ${data.name}`, () => {
        const dto = ineeda<BlockDto>({
          [data.name]: data.dtoValue
         });

        const theClass = dtoToBlock(dto);

        expect(theClass[data.name]).toEqual(data.expectedValue);
      });
    });
  });
});
