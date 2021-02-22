import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiPickersUtilsProviderProps } from '@material-ui/pickers/MuiPickersUtilsProvider';
import equalsByChildrenPropsValue from 'utils/equalsByChildrenPropsValue';
import withShouldUpdate from './hoc/withShouldUpdate';

const MemoDatePicker: React.FunctionComponent<MuiPickersUtilsProviderProps> = withShouldUpdate(
  equalsByChildrenPropsValue,
  MuiPickersUtilsProvider
);

export default MemoDatePicker;
