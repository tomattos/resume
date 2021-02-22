import React from 'react';
import { Grid, Paper, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { always, compose, ifElse, isNil, not, path } from 'ramda';
import { selectLoggedIn } from 'store/auth/selectors';
import useQuery from 'hooks/useQuery';
import useSetToken from 'hooks/useSetTokens';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    minHeight: '100vh',
    background: `url(${process.env.PUBLIC_URL}/images/register.jpg) center center no-repeat;`,
    backgroundSize: 'cover',
  },
  formWrapper: {
    maxWidth: '420px',
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 -25px 37.7px 11.3px rgba(8,143,220,0.07)',
  },
  formSbtButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'initial',
  },
  copyright: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
}));

function Login() {
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const isLoggedIn = useSelector(selectLoggedIn);
  const accessToken = query.get('accessToken');
  const refreshToken = query.get('refreshToken');

  useSetToken({ accessToken, refreshToken });

  const handleOpenGoogleLoginScreen = (): void => {
    window.location.href = process.env.REACT_APP_GOOGLE_AUTH_PATH;
  };

  const getFromPath = ifElse(
    compose(not, isNil),
    path(['from', 'pathname']),
    always('/')
  );

  return isLoggedIn ? (
    <Redirect to={getFromPath(history.location.state)} />
  ) : (
    <Grid
      container
      className={classes.root}
      alignItems="center"
      justify="center"
    >
      <Grid
        item
        className={classes.formWrapper}
        lg={4}
        elevation={0}
        component={Paper}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          alt="Logo"
          style={{ marginBottom: '10px' }}
        />

        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="primary"
          className={classes.formSbtButton}
          onClick={handleOpenGoogleLoginScreen}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 48 48"
            style={{ marginRight: '10px' }}
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path
                fill="none"
                d="M0 0h48v48H0z"
              />
            </g>
          </svg>
          Sign in with Google
        </Button>

        <Typography variant="caption">
          You will need a corporate Google account to proceed
        </Typography>
      </Grid>

      <Grid
        item
        className={classes.copyright}
      >
        <Typography>
          Copyright © 2020{' '}
          <Link href="https://inventorsoft.co">InventorSoft</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Login;
