import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import CustomAlert from './CustomAlert';

type Props = {
  link: string;
  open: boolean;
  closeHandler(cvId: number | undefined): Promise<void>;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: '400px',
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  content: {
    padding: theme.spacing(3),
  },
  copyBtn: {
    marginLeft: theme.spacing(1),
  },
}));

function PublicLinkModal({ link, open, closeHandler }: Props) {
  const classes = useStyles();
  const [openSnack, setOpenSnack] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>();

  async function handleCopyLink() {
    const { value } = textFieldRef.current as HTMLInputElement;
    await navigator.clipboard.writeText(value);
    setOpenSnack(true);
  }

  return (
    <Dialog
      open={open}
      onClose={() => closeHandler(undefined)}
      maxWidth={false}
    >
      <IconButton
        size="small"
        className={classes.close}
        onClick={() => closeHandler(undefined)}
      >
        <Close />
      </IconButton>

      <DialogContent className={classes.content}>
        <DialogTitle>Public link</DialogTitle>

        <TextField
          className={classes.textField}
          disabled
          value={link}
          inputRef={textFieldRef}
        />

        <Button
          className={classes.copyBtn}
          onClick={handleCopyLink}
        >
          Copy link
        </Button>
      </DialogContent>

      <CustomAlert
        content="Link has been copied !"
        open={openSnack}
        closeHandler={() => setOpenSnack(false)}
      />
    </Dialog>
  );
}

export default PublicLinkModal;
