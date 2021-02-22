/* selectors */
import { RootState } from '../rootReducer';
import { cvDocumentAdapter, foldersAdapter } from './state';

export const {
  selectAll: selectAllFolders,
} = foldersAdapter.getSelectors<RootState>((state) => state.folders.folders);

export const {
  selectAll: selectAllCvDocuments,
  selectById: selectCVDocumentById
} = cvDocumentAdapter.getSelectors<RootState>((state) => state.folders.cvDocuments);

export const selectCurrentFolder = (state: RootState) => state.folders.currentFolder;
