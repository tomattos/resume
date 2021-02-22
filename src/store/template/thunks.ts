import { createAsyncThunk } from '@reduxjs/toolkit';
import createThunkType from 'utils/createThunkType';
import { cvApi } from 'api/services/cv.api';
import { ICV } from 'models/cv';
import { actions } from './slice';

const createType = createThunkType('template');

export const fetchCVForDownloadPDF = createAsyncThunk(
  createType('fetchCVForDownloadPDF'),
  async (id: number, { dispatch }) => {
    const { jsonData } = await cvApi.fetchOne(id);
    dispatch(actions.dataForTemplateReceived(jsonData as ICV));
  }
);

