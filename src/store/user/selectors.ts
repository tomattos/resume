import { RootState } from '../rootReducer';
import { userAdapter } from './state';
import { IUser } from '../../models/user';

export const {
  selectAll: selectAllUsers,
} = userAdapter.getSelectors<RootState>((state) => state.user);

export const selectCurrentUser =
  (state: RootState): IUser | undefined => state.user.currentUser;

export const selectHasCVStatus =
  (state: RootState): boolean | undefined => state.user.currentUser?.hasCv;
