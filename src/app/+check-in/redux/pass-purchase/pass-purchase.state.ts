export interface PassPurchaseState {
  studentId: number;
  passId: number;

  isPurchasing: boolean;
  hasPurchased: boolean;
  purchaseError: string;
}
