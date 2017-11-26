import { User } from '../../../shared/state-models/teacher';
import { SelectionOption } from '../../../shared/state-models/selection-option';
import { TeachersState } from '../../../core/redux/teachers/teachers.state';
import { BlockFormModel } from '../../components/block-form/block-form.component.model';
import { DraftBlocksState } from './draft-blocks.state';
import { Block } from '../../../shared/state-models/block';

export const getSelectedDraftBlock = (state: DraftBlocksState) => {
  if (!state) {
    return null;
  }

  return state.blocks[state.selectedId];
};

export const getDraftBlockFormModel = (state: DraftBlocksState, teacherState: TeachersState) => {
  if (!state || !teacherState) {
    return null;
  }

  const selectedBlock = state.blocks[state.selectedId];
  const teachers = teacherState.teachers;
  const showLoader = !state.hasLoaded || state.isSaving;
  const hasError = !!state.loadError || !!state.saveError;

  return getBlockFormModel(selectedBlock, teachers, hasError, showLoader);
};

export function getBlockFormModel(
  block: Block,
  teachers: { [id: number]: User },
  hasError: boolean,
  showLoader: boolean): BlockFormModel {
  return {
    hasError,
    isLoading: showLoader,
    block: block ? {
      name: block.name,
      inviteOnly: block.isInviteOnly,
      minutesPerClass: block.minutesPerClass,
      numberOfClasses: block.numberOfClasses,
      classCapacity: block.classCapacity,
      startDate: block.startDate,
      teacher: block.teachers[0]
    } : null,
    teachers: Object.keys(teachers)
      .map(id => teachers[id])
      .map(t => ({
        name: t.fullName,
        value: t.id
      }))
  } as BlockFormModel;
}
