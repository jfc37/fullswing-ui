export interface Block {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  numberOfClasses: number;
  minutesPerClass: number;
  classCapacity: number;
  isInviteOnly: boolean;
  teachers: number[];
}
