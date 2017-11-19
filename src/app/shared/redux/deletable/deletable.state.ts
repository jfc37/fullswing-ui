export interface DeletableState {
  isDeleting: {
    [id: number]: boolean;
  };
  deleteError: {
    [id: number]: string;
  };
}
