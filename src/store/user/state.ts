import { createEntityAdapter } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';

export const userAdapter = createEntityAdapter<IUser>();
