import { CurrentPassesModel, PassModel } from '../../components/current-passes/current-passes.component.model';
import { CurrentPassesState } from './current-passes.state';

export const getCurrentPassesModel = (state: CurrentPassesState) => {
  if (!!state) {
    return {
      isLoading: !state.hasLoaded,
      hasError: !!state.loadError,
      passes: state.passes.map(pass => ({
        type: pass.passType,
        expiry: pass.endDate,
        additionalInfo: pass.clipsRemaining ? `${pass.clipsRemaining} left` : null
      } as PassModel))
    } as CurrentPassesModel;
  }

  return null;
};
