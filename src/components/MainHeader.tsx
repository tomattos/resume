import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, MenuItem, useTheme, useMediaQuery } from '@material-ui/core';
import { Menu, AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logOut } from 'store/auth/thunks';
import CustomMenu from './CustomMenu';

type Props = {
  open: boolean;
  sidebarToggleHandler: () => void;
};

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '15px'
    },
  },
  hide: {
    display: 'none',
  },
}));

function MainHeader({ open, sidebarToggleHandler }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  function handleLogout() {
    dispatch(logOut());
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={sidebarToggleHandler}
          className={open ? classes.hide : ''}
        >
          <Menu />
        </IconButton>
        <Link
          to="/dashboard"
          className={classes.logo}
        >
          <img
            width={matches ? 180 : 120}
            alt="Logo"
            src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          />
        </Link>
        <CustomMenu
          renderButton={(props) => (
            <IconButton {...props}>
              <AccountCircle />
            </IconButton>
          )}
          renderMenu={() => (
            <div>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </div>
          )}
          ariaControlsLabel="toolbar-menu"
        />
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
