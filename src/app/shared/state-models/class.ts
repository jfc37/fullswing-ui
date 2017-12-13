export interface Class {
  id: number;
  name: string;
  blockId: number;
  classCapacity: number;
  startTime: Date;
  endTime: Date;
  actualStudentIds: number[];
  registeredStudentIds: number[];
}
