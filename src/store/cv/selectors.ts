import { createSelector } from '@reduxjs/toolkit';
import { lensPath, map, over } from 'ramda';
import { format } from 'date-fns';
import { RootState } from '../rootReducer';
import { cvAdapter } from './state';

export const {
  selectAll,
} = cvAdapter.getSelectors<RootState>((state) => state.cv);

const creationDateLens = lensPath(['jsonData', 'creationDate']);
const transformDate = (date: string) => format(new Date(date), 'PP');

export const selectAllCVs = createSelector(
  selectAll,
  (cvs) => cvs.length
    ? map(over(creationDateLens, transformDate), cvs)
    : []
);

export const selectCurrentCV = (state: RootState) => state.cv.currentCV?.jsonData;
export const selectCurrentCVId = (state: RootState) => state.cv.currentCV?.id;
