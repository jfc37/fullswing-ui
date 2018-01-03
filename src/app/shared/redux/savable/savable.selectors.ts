import { SavableState } from './savable.state';

export const getHasSaved = (state: SavableState) => state && state.hasSaved;
export const getIsSaving = (state: SavableState) => state && state.isSaving;
