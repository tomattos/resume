import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

type Props = {
  toDispatch: any;
};

function DownloadCVIcon({ toDispatch }: Props) {
  const dispatch = useDispatch();

  return (
    <Tooltip title="Download PDF">
      <IconButton onClick={() => dispatch(toDispatch)}>
        <GetApp color="primary" />
      </IconButton>
    </Tooltip>
  );
}

export default DownloadCVIcon;
