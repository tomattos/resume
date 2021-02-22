import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

function Loading() {
  return (
    <Backdrop
      open={true}
      style={{ zIndex: 1000 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
