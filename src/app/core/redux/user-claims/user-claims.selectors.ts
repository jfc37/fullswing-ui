import { UserClaimsState } from './user-claims.state';

export const getIsTeacher = (state: UserClaimsState) => hasClaim(state, 'teacher');

export const getIsAdmin = (state: UserClaimsState) => hasClaim(state, 'admin');

function hasClaim(state: UserClaimsState, claim: string): boolean {
  return !!state && !!state.claims.find(c => c.toLowerCase() === claim);
}
