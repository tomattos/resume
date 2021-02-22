import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cvAdapter } from './state';
import { CVDto } from '../../api/services/cv.api';

interface InitialState {
  currentCV?: CVDto;
}

export const { reducer: cvReducer, actions } = createSlice({
  name: 'cv',
  initialState: cvAdapter.getInitialState<InitialState>({
    currentCV: undefined
  }),
  reducers: {
    cvsReceived(state, action: PayloadAction<CVDto[]>) {
      cvAdapter.setAll(state, action.payload);
    },
    cvReceived(state, action: PayloadAction<CVDto | undefined>) {
      state.currentCV = action.payload;
    }
  }
});
