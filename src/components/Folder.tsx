import React, { useState } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { IFolder } from 'models/folder';
import handleKeyPress from 'utils/handleKeyPress';
import FolderContents from './FolderContents';

type Props = {
  name: string;
  folderId: number;
  dbClickHandler(): void;
  updateHandler(changes: Partial<IFolder>): void;
};

function Folder({ name, dbClickHandler, updateHandler }: Props) {
  const [editable, setEditable] = useState(false);

  function handleUpdateFolderName(newFolderName: string) {
    updateHandler({ name: newFolderName });
    setEditable(false);
  }

  return (
    <FolderContents
      onDoubleClick={dbClickHandler}
      renderName={() =>
        editable ? (
          <TextField
            autoFocus
            size="small"
            defaultValue={name}
            onBlur={() => setEditable(false)}
            onKeyPress={handleKeyPress('Enter', name, handleUpdateFolderName)}
          />
        ) : (
          <Typography
            variant="caption"
            onClick={() => setEditable(true)}
          >
            {name}
          </Typography>
        )}
    />
  );
}

export default Folder;
