import React from 'react';
import {
  Chip,
  FormControl,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FieldHookConfig, useField } from 'formik';

type Props = {
  label: string;
  placeholder: string;
  [key: string]: any;
};

function CustomAutocomplete({ label, placeholder, ...other }: Props) {
  const [, meta] = useField(other as FieldHookConfig<{}>);

  return (
    <FormControl
      error={!!(meta.touched && meta.error)}
      style={{ width: '100%' }}
    >
      <Autocomplete
        multiple
        options={[]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, i: number) => (
            <Chip
              key={i}
              variant="outlined"
              label={option}
              {...getTagProps({ index: i })}
            />
          ))}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
        {...other}
      />

      {!!(meta.touched && meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomAutocomplete;
