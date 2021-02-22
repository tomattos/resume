import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldHookConfig, useField } from 'formik';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

type Props = TextFieldProps & {
  error?: boolean;
  touched?: string;
  errors?: string;
};

function CustomTextField(props: Props) {
  const [field, meta] = useField(props as FieldHookConfig<{}>);

  return (
    <TextField
      error={!!(meta.touched && meta.error)}
      touched={meta.touched.toString()}
      errors={meta.error}
      {...field}
      {...props}
      // order make sense
      helperText={(meta.touched && meta.error) ? meta.error : props.helperText}
    />
  );
}

export default CustomTextField;
