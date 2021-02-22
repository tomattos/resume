import { createAsyncThunk } from '@reduxjs/toolkit';
import createThunkType from 'utils/createThunkType';
import { userApi } from 'api/services/user.api';
import { IUser } from 'models/user';
import { actions } from './slice';

const createType = createThunkType('user');

export const fetchOneUser = createAsyncThunk(
  createType('fetchOneUser'),
  async (id: number, { dispatch }): Promise<void> => {
    const user = await userApi.fetchOne(id);
    dispatch(actions.userReceived(user));
  }
);

export const fetchAllUsers = createAsyncThunk(
  createType('fetchAllUsers'),
  async (data, { dispatch }): Promise<void> => {
    const users = await userApi.fetchAll();
    dispatch(actions.usersReceived(users));
  }
);

export const updateUser = createAsyncThunk(
  createType('updateUser'),
  async (user: IUser, { dispatch }): Promise<void> => {
    const updatedUser = await userApi.update(user);
    dispatch(actions.updatedUserReceived(updatedUser));
  }
);

export const removeUser = createAsyncThunk(
  createType('removeUser'),
  async (id: number, { dispatch }) => {
    await userApi.remove(id);
    dispatch(actions.userRemoved({ id }));
  }
);

export const fetchProfile = createAsyncThunk(
  createType('fetchProfile'),
  async (data, { dispatch }) => {
    const profile = await userApi.fetchProfile();
    dispatch(actions.userReceived(profile));
  }
);
