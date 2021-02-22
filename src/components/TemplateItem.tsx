import React from 'react';
import { Paper, Typography, Checkbox } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  templateId: number;
  name: string;
  checked?: boolean;
  changeHandler: (templateId: number) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  footer: {
    padding: theme.spacing(1),
  },
  checkbox: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
}));

function TemplateItem({
  templateId,
  name,
  checked = false,
  changeHandler,
}: Props) {
  const classes = useStyles();

  return (
    <Paper
      variant="elevation"
      className={classes.root}
    >
      <Checkbox
        color="secondary"
        className={classes.checkbox}
        checked={checked}
        value={templateId}
        onChange={() => changeHandler(templateId)}
      />

      <Skeleton
        variant="rect"
        width="100%"
        height={118}
      />

      <Typography
        color="secondary"
        className={classes.footer}
      >
        {name}
      </Typography>
    </Paper>
  );
}

export default TemplateItem;
