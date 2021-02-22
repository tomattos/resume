import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState, initialState } from './state';
import { Role } from '../../models/auth';

export const { reducer: authReducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state: AuthSliceState, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    setLoggedIn(state: AuthSliceState, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    setCurrentUserId(state: AuthSliceState, action: PayloadAction<number>) {
      state.id = action.payload;
    }
  }
});
