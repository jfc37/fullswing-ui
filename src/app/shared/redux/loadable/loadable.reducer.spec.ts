import { LoadableState } from './loadable.state';
import { getInitialLoadableState, getLoadFailureState, getLoadingState, getLoadSuccessState } from './loadable.reducer';
import { ineeda } from 'ineeda';

describe('getInitialLoadableState', () => {
  it(`should return isLoading as false`, () => {
    const result = getInitialLoadableState();
    expect(result.isLoading).toBe(false);
  });

  it(`should return hasLoaded as false`, () => {
    const result = getInitialLoadableState();
    expect(result.hasLoaded).toBe(false);
  });

  it(`should return loadError as null`, () => {
    const result = getInitialLoadableState();
    expect(result.loadError).toBeNull();
  });
});

describe('getLoadingState', () => {
  const loadableState = ineeda<LoadableState>();

  it(`should return isLoading as true`, () => {
    const result = getLoadingState(loadableState);
    expect(result.isLoading).toBe(true);
  });

  it(`should return hasLoaded as false`, () => {
    const result = getLoadingState(loadableState);
    expect(result.hasLoaded).toBe(false);
  });

  it(`should return loadError as null`, () => {
    const result = getLoadingState(loadableState);
    expect(result.loadError).toBeNull();
  });
});

describe('getLoadSuccessState', () => {
  const loadableState = ineeda<LoadableState>();

  it(`should return isLoading as false`, () => {
    const result = getLoadSuccessState(loadableState);
    expect(result.isLoading).toBe(false);
  });

  it(`should return hasLoaded as true`, () => {
    const result = getLoadSuccessState(loadableState);
    expect(result.hasLoaded).toBe(true);
  });

  it(`should return loadError as null`, () => {
    const result = getLoadSuccessState(loadableState);
    expect(result.loadError).toBeNull();
  });
});

describe('getLoadFailureState', () => {
  const loadableState = ineeda<LoadableState>();
  const error = 'ERROR';

  it(`should return isLoading as false`, () => {
    const result = getLoadFailureState(loadableState, error);
    expect(result.isLoading).toBe(false);
  });

  it(`should return hasLoaded as true`, () => {
    const result = getLoadFailureState(loadableState, error);
    expect(result.hasLoaded).toBe(true);
  });

  it(`should return loadError as error`, () => {
    const result = getLoadFailureState(loadableState, error);
    expect(result.loadError).toBe(error);
  });
});
