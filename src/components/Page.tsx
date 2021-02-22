import React, { ReactElement, ReactNode } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type PageProps = {
  component: ReactElement;
  title: string;
  renderTitleTools?(): ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '10px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function Page({ component, title, renderTitleTools }: PageProps) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Typography
          variant="h4"
          color="textSecondary"
          style={{ marginBottom: '0' }}
        >
          {title}
        </Typography>

        {renderTitleTools && renderTitleTools()}
      </Container>
      {component}
    </>
  );
}

export default Page;
