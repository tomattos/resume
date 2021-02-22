import React, { useContext } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Divider,
  useTheme,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, NavLink } from 'react-router-dom';
import NavigationContext, {
  INavigationItem,
} from 'contexts/navigation-context';
import { Can } from 'components/Can';

type Props = {
  open: boolean;
  sidebarToggleHandler: () => void;
};

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
}));

function MainSidebar({ open, sidebarToggleHandler }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const navigation = useContext(NavigationContext);

  function handleSidebarItemClick(to: string) {
    history.push(to);
    sidebarToggleHandler();
  }

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <img
          alt="Logo"
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          width={180}
          style={{ padding: '10px' }}
        />
        <IconButton onClick={sidebarToggleHandler}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>

      <Divider />

      <List>
        {navigation.map(({ name, to, icon: Icon, subject }: INavigationItem) => (
          <Can
            key={to}
            I="read"
            a={subject}
          >
            <ListItem
              button
              key={name}
              to={to}
              component={NavLink}
              style={{
                color: theme.palette.grey['700'],
              }}
              activeStyle={{
                backgroundColor: theme.palette.grey['300'],
              }}
              onClick={() => handleSidebarItemClick(to)}
            >
              <ListItemIcon>
                <Icon style={{ color: theme.palette.grey['600'] }} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Can>
        ))}
      </List>
    </Drawer>
  );
}

export default MainSidebar;
