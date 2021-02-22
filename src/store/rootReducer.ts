import { combineReducers } from 'redux';
import { foldersReducer } from './folder/slice';
import { authReducer } from './auth/slice';
import { cvReducer } from './cv/slice';
import { userReducer } from './user/slice';
import { templateReducer } from './template/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  folders: foldersReducer,
  cv: cvReducer,
  user: userReducer,
  template: templateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
