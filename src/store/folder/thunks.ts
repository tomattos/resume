import { createAsyncThunk } from '@reduxjs/toolkit';
import createThunkType from '../../utils/createThunkType';
import { folderApi, ICVMove } from '../../api/services/folder.api';
import { actions } from './slice';
import { IFolder } from '../../models/folder';
import { extractIdFromCurrent } from '../../utils/extractIdFromCurrent';
import { FolderEntity } from '../../entities/FolderEntity';
import { cvApi } from '../../api/services/cv.api';
import { ICVDocument } from '../../models/cv';

const createType = createThunkType('folder');
const extractIdFromCurrentFolder = extractIdFromCurrent(['folders', 'currentFolder']);

export const fetchRootFolder = createAsyncThunk(
  createType('fetchRootFolder'),
  async (data, { dispatch }) => {
    const folder = await folderApi.fetchRoot();
    dispatch(actions.foldersReceived(folder.innerFolderList || []));
    dispatch(actions.cvDocumentsReceived(folder.userCvList || []));
    dispatch(actions.currentFolderReceived(folder));
  }
);

export const fetchFolder = createAsyncThunk(
  createType('fetchRootFolder'),
  async (id: number, { dispatch }) => {
    const folder = await folderApi.fetchOne(id);
    dispatch(actions.foldersReceived(folder.innerFolderList || []));
    dispatch(actions.cvDocumentsReceived(folder.userCvList || []));
    dispatch(actions.currentFolderReceived(folder));
  }
);

export const updateFolder = createAsyncThunk(
  createType('updateFolder'),
  async (payload: IFolder, { dispatch }) => {
    // payload (IFolder) will come without parentId
    // we should take parentId from the store -> currentFolder and add it to the request payload
    const updatedFolder = await folderApi
      .update({ ...payload } as IFolder);
    dispatch(actions.folderReceived(updatedFolder));
  }
);

export const createFolder = createAsyncThunk(
  createType('createFolder'),
  async (data, { dispatch, getState }) => {
    const parentId = extractIdFromCurrentFolder(getState());
    const newFolder = await folderApi.create(new FolderEntity(parentId));

    dispatch(actions.folderCreated(newFolder));
  }
);

export const moveCVDocument = createAsyncThunk(
  createType('moveCVDocument'),
  async (payload: ICVMove, { dispatch }) => {
    dispatch(actions.cvDocumentSettledDown({ id: payload.id }));
    await folderApi.moveCV(payload);
  }
);

export const cloneCV = createAsyncThunk(
  createType('cloneCV'),
  async (id: number, { dispatch }) => {
    const cv = await cvApi.clone(id);
    dispatch(actions.cvDocumentReceived(cv));
  }
);

export const removeCV = createAsyncThunk(
  createType('removeCV'),
  async (id: number, { dispatch }) => {
    await cvApi.remove(id);
    dispatch(actions.cvDocumentSettledDown({ id }));
  }
);

export const removeFolder = createAsyncThunk(
  createType('removeFolder'),
  async (id: number, { dispatch }) => {
    await folderApi.remove(id);
    dispatch(actions.folderRemoved({ id }));
  }
);

export const updateDocumentAccessLevel = createAsyncThunk(
  createType('updateDocumentAccessLevel'),
  async (payload: ICVDocument, { dispatch }) => {
    await cvApi.updateCVAccess({ id: payload.id, accessLevel: payload.accessLevel });
    dispatch(actions.cvDocumentUpdated(payload));
  }
);
