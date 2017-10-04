import { Pass, passTypeId, VALID_PASS_TYPES } from '../state-models/pass';
export interface PassDto {
  clipsRemaining: number;
  id: number;
  createdDateTime: string;
  startDate: string;
  endDate: string;
  passType: string;
  passNumber: number;
  cost: number;
  description: string;
  valid: boolean;
}

export function dtoToPass(dto: PassDto): Pass {
  return {
    clipsRemaining: dto.clipsRemaining,
    id: dto.id,
    createdDateTime: new Date(dto.createdDateTime),
    startDate: new Date(dto.startDate),
    endDate: new Date(dto.endDate),
    passType: dto.passType.toLowerCase(),
    passNumber: dto.passNumber,
    cost: dto.cost,
    description: dto.description,
    valid: dto.valid,
  } as Pass;
}

export function validateDtoPass(dto: PassDto): void {
  validatePassType(dto);
}

function validatePassType(dto: PassDto): void {
  const isValid = VALID_PASS_TYPES.indexOf(dto.passType.toLowerCase()) > -1;
  if (!isValid) {
    throw new Error(`Unknown pass type for pass id ${dto.id}: ${dto.passType}`);
  }
}
