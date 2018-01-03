export interface StudentCheckInState {
  studentId: number;
  classId: number;

  isCheckingIn: boolean;
  hasCheckedIn: boolean;
  checkInError: string;

  isRemoving: boolean;
  hasRemoved: boolean;
  removeError: string;
}
