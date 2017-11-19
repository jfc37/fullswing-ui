import { ineeda } from 'ineeda';
import { getInitialDeletableState, getDeletingState, getDeleteSuccessState, getDeleteFailureState } from './deletable.reducer';
import { DeletableState } from './deletable.state';

describe('getInitialDeletableState', () => {
  it(`should return isDeleting empty object`, () => {
    const result = getInitialDeletableState();
    expect(result.isDeleting).toEqual({});
  });

  it(`should return deleteError as empty object`, () => {
    const result = getInitialDeletableState();
    expect(result.deleteError).toEqual({});
  });
});

describe('getDeletingState', () => {
  const id = 402;
  const deletableState = ineeda<DeletableState>();

  it(`should return isDeleting for id as true`, () => {
    const result = getDeletingState(deletableState, id);
    expect(result.isDeleting[id]).toBe(true);
  });

  it(`should return deleteError for id as null`, () => {
    const result = getDeletingState(deletableState, id);
    expect(result.deleteError[id]).toBeNull();
  });
});

describe('getDeleteSuccessState', () => {
  const id = 5034;
  const deletableState = ineeda<DeletableState>();

  it(`should return isDeleting for id as false`, () => {
    const result = getDeleteSuccessState(deletableState, id);
    expect(result.isDeleting[id]).toBe(false);
  });

  it(`should return deleteError for id as null`, () => {
    const result = getDeleteSuccessState(deletableState, id);
    expect(result.deleteError[id]).toBeNull();
  });
});

describe('getDeleteFailureState', () => {
  const id = 4232;
  const deletableState = ineeda<DeletableState>({isDeleting: {[id]: true}});
  const error = 'ERROR';

  it(`should return isDeleting for id as false`, () => {
    const result = getDeleteFailureState(deletableState, id, error);
    expect(result.isDeleting[id]).toBe(false);
  });

  it(`should return deleteError for id as error`, () => {
    const result = getDeleteFailureState(deletableState, id, error);
    expect(result.deleteError[id]).toBe(error);
  });
});
