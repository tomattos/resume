import { Role } from '../../models/auth';

export type AuthSliceState = {
  loggedIn: boolean,
  role: Role,
  id: number | null
};

export const initialState: AuthSliceState = {
  loggedIn: false,
  role: null,
  id: null
};
