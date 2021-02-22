import React from 'react';
import { Color } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

type Props = {
  variant?: Color;
  content: string;
  open: boolean;
  closeHandler(): void;
};

function CustomAlert({
  open,
  closeHandler,
  content,
  variant = 'success',
}: Props) {
  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={closeHandler}
    >
      <Alert
        severity={variant}
        variant="filled"
      >
        {content}
      </Alert>
    </Snackbar>
  );
}

export default CustomAlert;
