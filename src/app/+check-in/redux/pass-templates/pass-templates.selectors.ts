import { PassTemplatesState } from './pass-templates.state';
import { PassSelectionModel } from '../../components/pass-selection/pass-selection.component.model';

export const getPassSelectionModel = (state: PassTemplatesState) => ({
  hasError: !!state.loadError,
  isLoading: state.isLoading,
  passes: Object.values(state.passTemplates)
    .map(pass => ({
      id: pass.id,
      description: pass.description,
      cost: pass.cost,
    }))
} as PassSelectionModel);
