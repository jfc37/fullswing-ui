export interface Pass {
  id: number;
  clipsRemaining: number;
  createdDateTime: Date;
  startDate: Date;
  endDate: Date;
  passType: passTypeId;
  passNumber: number;
  cost: number;
  description: string;
  valid: boolean;
}

export type passTypeId
 = 'clip'
 | 'unlimited';

 export const VALID_PASS_TYPES = ['clip', 'unlimited'];
