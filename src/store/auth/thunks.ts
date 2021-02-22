import { createAsyncThunk } from '@reduxjs/toolkit';
import { compose } from 'ramda';
import { TokensPair, Role } from '../../models/auth';
import extractRole from '../../utils/extractRole';
import curriedJwtDecode from '../../utils/curriedJwtDecode';
import { ability, updateAbility } from '../../utils/ability';
import { actions } from './slice';
import createThunkType from '../../utils/createThunkType';

const createType = createThunkType('auth');

export const setUpTokens = createAsyncThunk(
  createType('setUpTokens'),
  ({ accessToken, refreshToken }: TokensPair, { dispatch }) => {
    localStorage.setItem('access-token', accessToken as string);
    localStorage.setItem('refresh-token', refreshToken as string);

    const role = compose(
      extractRole,
      curriedJwtDecode
    )(accessToken as string);

    /* update login state */
    dispatch(actions.setRole(role as Role));
    dispatch(actions.setLoggedIn(true));

    /* update ability object with new permissions */
    updateAbility(ability, role as Role);
  },
);

export const logOut = createAsyncThunk(
  createType('logOut'),
  (data, { dispatch }) => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');

    dispatch(actions.setRole(null));
    dispatch(actions.setLoggedIn(false));
  }
);
