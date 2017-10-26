export function getArgument<T>(spy: any, argumentNumber = 0): T {
  return (<jasmine.Spy>spy)
  .calls.mostRecent().args[argumentNumber] as T;
}

export function resetSpy(spy: any): void {
  (<jasmine.Spy>spy).calls.reset();
}
