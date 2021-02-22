import { createAsyncThunk } from '@reduxjs/toolkit';
import { cvApi, CVDto } from '../../api/services/cv.api';
import { actions } from './slice';
import createThunkType from '../../utils/createThunkType';
import { ICV } from '../../models/cv';

const createType = createThunkType('cv');

export const createCV = createAsyncThunk(
  createType('createCV'),
  async (cv: ICV, { dispatch }) => {
    const createdCV = await cvApi.create(cv);
    dispatch(actions.cvReceived(createdCV));
  }
);

export const createCVForNonExistingUser = createAsyncThunk(
  createType('createCVForNonExistingUser'),
  async (cv: ICV) => {
    await cvApi.createForNonExistingUser(cv);
  }
);

export const fetchAllCVs = createAsyncThunk(
  createType('fetchAllCVs'),
  async (data, { dispatch }) => {
    const cvs = await cvApi.fetchAll();
    dispatch(actions.cvsReceived(cvs));
  }
);

export const deleteCV = createAsyncThunk(
  createType('deleteCV'),
  async (id: number, { dispatch }) => {
    await cvApi.remove(id);
    dispatch(fetchAllCVs());
  }
);

export const fetchUserCV = createAsyncThunk(
  createType('fetchUserCV'),
  async (data, { dispatch }) => {
    const cv = await cvApi.fetchUserCV();
    dispatch(actions.cvReceived(cv));
  }
);

export const fetchOneCV = createAsyncThunk(
  createType('fetchOneCV'),
  async (id: number, { dispatch }) => {
    const cv = await cvApi.fetchOne(id);
    dispatch(actions.cvReceived(cv));
  }
);

export const updateCV = createAsyncThunk(
  createType('updateCV'),
  async (data: CVDto, { dispatch }) => {
    const cv = await cvApi.update(data);
    dispatch(actions.cvReceived(cv));
  }
);
