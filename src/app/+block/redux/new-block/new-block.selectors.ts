import { NewBlockState } from './new-block.state';
import { TeachersState } from '../../../core/redux/teachers/teachers.state';
import { getBlockFormModel } from '../draft-blocks/draft-blocks.selectors';

export const getNewBlockFormModel = (state: NewBlockState, teacherState: TeachersState) => {
  if (!state || !teacherState) {
    return null;
  }

  const teachers = teacherState.teachers;
  const showLoader =  state.isSaving;
  const hasError = !!state.saveError;

  return getBlockFormModel(state.block, teachers, hasError, showLoader);
};
