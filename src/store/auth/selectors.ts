import { curry } from 'ramda';
import { RootState } from '../rootReducer';

export const selectLoggedIn = curry((state: RootState) => state.auth.loggedIn);
export const selectRole = (state: RootState) => state.auth.role;
