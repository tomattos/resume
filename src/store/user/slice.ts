import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAdapter } from './state';
import { IUser } from '../../models/user';

interface InitialState {
  currentUser?: IUser,
}

export const { reducer: userReducer, actions } = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState<InitialState>({
    currentUser: undefined
  }),
  reducers: {
    userReceived(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
    },
    usersReceived(state, action: PayloadAction<IUser[]>) {
      userAdapter.setAll(state, action.payload);
    },
    updatedUserReceived(state, action: PayloadAction<IUser>) {
      userAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    userRemoved(state, action: PayloadAction<{ id: number }>) {
      userAdapter.removeOne(state, action.payload.id);
    }
  }
});
