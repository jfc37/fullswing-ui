import { SavableState } from './savable.state';

export const getHasSaved = (state: SavableState) => state && state.hasSaved;
