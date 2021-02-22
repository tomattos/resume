import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { KeyboardBackspaceOutlined } from '@material-ui/icons';

type Props = {
  global?: boolean;
};

function BackBtn({ global = true }: Props) {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<KeyboardBackspaceOutlined fontSize="small" />}
      onClick={handleClick}
    >
      Back
    </Button>
  );
}

export default BackBtn;
