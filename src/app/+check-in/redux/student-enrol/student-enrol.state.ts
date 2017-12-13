export interface StudentEnrolState {
  studentId: number;
  blockId: number;

  isEnrolling: boolean;
  hasEnrolled: boolean;
  enrolError: string;
}
