import React from 'react';
import { Description, FileCopy } from '@material-ui/icons';
import { ICVDocument } from 'models/cv';
import FolderContents from './FolderContents';

type Props = {
  cvDocumentData: ICVDocument;
  dbClickHandler(): void;
};

function CVDocument({ cvDocumentData, dbClickHandler }: Props) {
  return (
    <FolderContents
      onDoubleClick={dbClickHandler}
      renderName={() => `${cvDocumentData.jsonData.cvName}`}
      renderIcon={() =>
        cvDocumentData.original ? (
          <Description fontSize="large" />
        ) : (
          <FileCopy fontSize="large" />
        )}
    />
  );
}

export default CVDocument;
