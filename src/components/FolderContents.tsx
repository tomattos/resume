import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Folder } from '@material-ui/icons';

type Props = {
  renderIcon?(): ReactNode;
  renderName(): ReactNode | string;
  [key: string]: any;
};

const useStyles = makeStyles((theme) => ({
  folder: {
    transition: '.3s',
    color: theme.palette.common.black,
    '&:hover': {
      color: theme.palette.primary.light,
      cursor: 'pointer',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'initial',
  },
}));

function FolderContents({ renderIcon, renderName, ...otherLinkProps }: Props) {
  const classes = useStyles();

  return (
    <div
      color="textPrimary"
      className={classes.folder}
      {...otherLinkProps}
    >
      <div className={classes.content}>
        {renderIcon ? renderIcon() : <Folder fontSize="large" />}

        {typeof renderName() !== 'string' ? (
          renderName()
        ) : (
          <Typography variant="caption">{renderName() as string}</Typography>
        )}
      </div>
    </div>
  );
}

export default FolderContents;
