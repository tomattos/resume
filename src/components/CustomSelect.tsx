import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
  FormHelperText,
} from '@material-ui/core';
import { FieldHookConfig, useField } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

type Props = SelectProps & {
  label?: string;
  list: (string | number)[];
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

function CustomSelect({ list, label, ...other }: Props) {
  const classes = useStyles();
  const [field, meta] = useField(other as FieldHookConfig<{}>);

  return (
    <FormControl
      variant="outlined"
      className={classes.root}
      error={!!(meta.touched && meta.error)}
    >
      <InputLabel id={field.name}>{label}</InputLabel>
      <Select
        labelId={field.name}
        autoWidth
        label={label}
        {...field}
        {...other}
      >
        {list.map((item) => (
          <MenuItem
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
      {!!(meta.touched && meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSelect;
