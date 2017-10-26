import { ineeda } from 'ineeda';
import { BlockDto, blockToDto, dtoToBlock } from './block.dto';
import { Block } from '../state-models/block';

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
      {
        name: 'teachers',
        dtoValue: [{ id: 1 }, { id: 2 }],
        expectedValue: [1, 2]
      }
    ].forEach(data => {
      it(`should map ${data.name}`, () => {
        const dto = ineeda<BlockDto>({
          teachers: [],
          [data.name]: data.dtoValue
        });

        const theClass = dtoToBlock(dto);

        expect(theClass[data.name]).toEqual(data.expectedValue);
      });
    });
  });

  describe('blockToDto', () => {
    [
      {
        name: 'id',
        dtoValue: 54,
        expectedValue: 54
      },
      {
        name: 'startDate',
        dtoValue: '2015-11-30T00:00:00.000Z',
        expectedValue: new Date('2015-11-30T00:00:00+00:00')
      },
      {
        name: 'endDate',
        dtoValue: '2015-11-30T00:00:00.000Z',
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
      {
        name: 'teachers',
        dtoValue: [{ id: 1 }, { id: 2 }],
        expectedValue: [1, 2]
      }
    ].forEach(data => {
      it(`should map ${data.name}`, () => {
        const block = ineeda<Block>({
          teachers: [],
          startDate: new Date(),
          endDate: new Date(),
          [data.name]: data.expectedValue
        });

        const dto = blockToDto(block);

        expect(dto[data.name]).toEqual(data.dtoValue);
      });
    });
  });
});
