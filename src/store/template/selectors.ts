import { RootState } from '../rootReducer';

export const selectCurrentTemplate = (state: RootState) => state.template.currentTemplate;
export const selectAllTemplates = (state: RootState) => state.template.templates;
export const selectDataForTemplate = (state: RootState) => state.template.dataForTemplate;
