export interface Class {
  id: number;
  name: string;
  classCapacity: number;
  startTime: Date;
  endTime: Date;
  actualStudentIds: number[];
  registeredStudentIds: number[];
}
