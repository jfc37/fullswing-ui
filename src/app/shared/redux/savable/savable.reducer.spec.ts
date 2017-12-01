import { SavableState } from './savable.state';
import { getInitialSavableState, getSaveFailureState, getSavingState, getSaveSuccessState } from './savable.reducer';
import { ineeda } from 'ineeda';

describe('getInitialSavableState', () => {
  it(`should return isSaving as false`, () => {
    const result = getInitialSavableState();
    expect(result.isSaving).toBe(false);
  });

  it(`should return hasSaved as false`, () => {
    const result = getInitialSavableState();
    expect(result.hasSaved).toBe(false);
  });

  it(`should return saveError as null`, () => {
    const result = getInitialSavableState();
    expect(result.saveError).toBeNull();
  });
});

describe('getSavingState', () => {
  const savableState = ineeda<SavableState>();

  it(`should return isSaving as true`, () => {
    const result = getSavingState(savableState);
    expect(result.isSaving).toBe(true);
  });

  it(`should return hasSaved as false`, () => {
    const result = getSavingState(savableState);
    expect(result.hasSaved).toBe(false);
  });

  it(`should return saveError as null`, () => {
    const result = getSavingState(savableState);
    expect(result.saveError).toBeNull();
  });
});

describe('getSaveSuccessState', () => {
  const savableState = ineeda<SavableState>();

  it(`should return isSaving as false`, () => {
    const result = getSaveSuccessState(savableState);
    expect(result.isSaving).toBe(false);
  });

  it(`should return hasSaved as true`, () => {
    const result = getSaveSuccessState(savableState);
    expect(result.hasSaved).toBe(true);
  });

  it(`should return saveError as null`, () => {
    const result = getSaveSuccessState(savableState);
    expect(result.saveError).toBeNull();
  });
});

describe('getSaveFailureState', () => {
  const savableState = ineeda<SavableState>();
  const error = 'ERROR';

  it(`should return isSaving as false`, () => {
    const result = getSaveFailureState(savableState, error);
    expect(result.isSaving).toBe(false);
  });

  it(`should return hasSaved as false`, () => {
    const result = getSaveFailureState(savableState, error);
    expect(result.hasSaved).toBe(false);
  });

  it(`should return saveError as error`, () => {
    const result = getSaveFailureState(savableState, error);
    expect(result.saveError).toBe(error);
  });
});
