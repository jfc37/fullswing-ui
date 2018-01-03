import { PassPurchaseState } from './pass-purchase.state';

export const getStudentId = (state: PassPurchaseState) => !!state && state.studentId;
export const getPassId = (state: PassPurchaseState) => !!state && state.passId;
