import { createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { cvDocumentAdapter, foldersAdapter } from './state';
import { IFolder } from '../../models/folder';
import { ICVDocument } from '../../models/cv';

interface InitialState {
  currentFolder: IFolder | null,
  folders: EntityState<IFolder>,
  cvDocuments: EntityState<ICVDocument>
}

export const { reducer: foldersReducer, actions } = createSlice({
  name: 'folder',
  initialState: {
    currentFolder: null,
    cvDocuments: cvDocumentAdapter.getInitialState(),
    folders: foldersAdapter.getInitialState()
  } as InitialState,
  reducers: {
    foldersReceived(state, action: PayloadAction<IFolder[]>) {
      foldersAdapter.setAll(state.folders, action.payload);
    },
    currentFolderReceived(state, action: PayloadAction<IFolder>) {
      state.currentFolder = action.payload;
    },
    folderCreated(state, action: PayloadAction<IFolder>){
      foldersAdapter.addOne(state.folders, action.payload);
    },
    folderReceived(state, action: PayloadAction<IFolder>) {
      foldersAdapter.updateOne(state.folders, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    folderMoved(state, action: PayloadAction<{ id: number }>) {
      foldersAdapter.removeOne(state.folders, action.payload.id);
    },
    folderRemoved(state, action: PayloadAction<{ id: number }>) {
      foldersAdapter.removeOne(state.folders, action.payload.id);
    },
    cvDocumentsReceived(state, action: PayloadAction<ICVDocument[]>) {
      cvDocumentAdapter.setAll(state.cvDocuments, action.payload);
    },
    cvDocumentReceived(state, action: PayloadAction<ICVDocument>) {
      cvDocumentAdapter.addOne(state.cvDocuments, action.payload);
    },
    cvDocumentSettledDown(state, action: PayloadAction<{ id: number }>) {
      cvDocumentAdapter.removeOne(state.cvDocuments, action.payload.id);
    },
    cvDocumentUpdated(state, action: PayloadAction<ICVDocument>) {
      cvDocumentAdapter.updateOne(state.cvDocuments, {
        id: action.payload.id,
        changes: action.payload
      });
    }
  }
});
