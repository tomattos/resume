import { createEntityAdapter } from '@reduxjs/toolkit';
import { IFolder } from '../../models/folder';
import { ICVDocument } from '../../models/cv';

export const foldersAdapter = createEntityAdapter<IFolder>();
export const cvDocumentAdapter = createEntityAdapter<ICVDocument>();
