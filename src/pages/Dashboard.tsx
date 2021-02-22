import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Can } from 'components/Can';
import NavigationContext from 'contexts/navigation-context';

type SectionButton = {
  children?: ReactNode;
  to: string;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
    height: '100%',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    color: '#fff',
  },
});

const SectionButton = ({ children, to }: SectionButton): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
    >
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        component={Link}
        to={to}
      >
        {children}
      </Button>
    </Grid>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const navigation = useContext(NavigationContext);

  return (
    <Grid
      container
      spacing={4}
      className={classes.root}
    >
      {navigation.map(({ to, name, icon: IconComponent, subject }) => (
        <Can
          key={to}
          I="read"
          a={subject}
        >
          <SectionButton to={to}>
            <IconComponent style={{ fontSize: '30px', marginRight: '10px' }} />
            <Typography
              variant="subtitle1"
              style={{ fontWeight: 'bold' }}
            >
              {name}
            </Typography>
          </SectionButton>
        </Can>
      ))}
    </Grid>
  );
};

export default Dashboard;
