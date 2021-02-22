import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate } from 'models/template';
import { ICV } from 'models/cv';

interface InitialState {
  currentTemplate: ITemplate,
  templates: ITemplate[],
  dataForTemplate: ICV | null
}

const initialState: InitialState = {
  dataForTemplate: null,
  currentTemplate: {
    id: 0,
    component: 'default',
    name: 'Default template'
  },
  templates: [
    {
      id: 0,
      component: 'default',
      name: 'Default template'
    }
  ]
};

export const { reducer: templateReducer, actions } = createSlice({
  name: 'template',
  initialState,
  reducers: {
    changeCurrentTemplate(state, action: PayloadAction<ITemplate>) {
      state.currentTemplate = action.payload;
    },
    dataForTemplateReceived(state, action: PayloadAction<ICV | null>) {
      state.dataForTemplate = action.payload;
    }
  }
});
