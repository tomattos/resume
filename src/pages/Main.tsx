import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import {
  AddCircleOutline,
  Folder,
  People,
  PresentToAll,
  Edit as EditIcon,
  Dashboard as DashboardIcon, AccessibleForward,
} from '@material-ui/icons';
import { findIndex, propEq, update } from 'ramda';
import { fetchProfile } from 'store/user/thunks';
import { selectCurrentUser, selectHasCVStatus } from 'store/user/selectors';
import { selectRole } from 'store/auth/selectors';
import { Role } from 'models/auth';
import { IUser } from 'models/user';
import { Can } from 'components/Can';
import MainHeader from 'components/MainHeader';
import Page from 'components/Page';
import Loading from 'components/Loading';
import MainSidebar from 'components/MainSidebar';
import BackBtn from 'components/BackBtn';
import NavigationContext, {
  INavigationItem,
} from 'contexts/navigation-context';
import CreateOutside from './CreateOutside';

const Dashboard = React.lazy(() => import('./Dashboard'));
const Create = React.lazy(() => import('./Create'));
const Edit = React.lazy(() => import('./Edit'));
const Folders = React.lazy(() => import('./Folders'));
const Users = React.lazy(() => import('./Users'));
const Templates = React.lazy(() => import('./Templates'));
const Template = React.lazy(() => import('./Template'));

const Main = () => {
  const dispatch = useDispatch();
  /**
   * @description open state used for toggling sidebar menu
   * */
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<INavigationItem[]>([
    {
      name: 'Folders',
      to: '/folders/root',
      icon: Folder,
      subject: 'Folders',
    },
    {
      name: 'Templates',
      to: '/templates',
      icon: PresentToAll,
      subject: 'Templates',
    },
    {
      name: 'Users',
      to: '/users',
      icon: People,
      subject: 'Users',
    },
    {
      name: 'Create CV',
      to: '/create',
      icon: AddCircleOutline,
      subject: 'CV',
    },
    {
      name: 'Outside CV',
      to: '/create-outside',
      icon: AccessibleForward,
      subject: 'CV'
    },
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: DashboardIcon,
      subject: 'Dashboard',
    },
  ]);
  const role: Role = useSelector(selectRole);
  const currentUser: IUser | undefined = useSelector(selectCurrentUser);
  const hasCVStatus = useSelector(selectHasCVStatus);

  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  const getRootRedirect = (userRole: Role): string => {
    return userRole === 'ADMIN' ? '/folders/root' : '/edit';
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const index: number = findIndex(propEq('subject', 'CV'), menu);
    const newMenu = update(
      index,
      {
        name: !hasCVStatus ? 'Create CV' : 'Edit CV',
        to: !hasCVStatus ? '/create' : '/edit',
        icon: !hasCVStatus ? AddCircleOutline : EditIcon,
        subject: 'CV',
      },
      menu
    );

    setMenu(newMenu);
  }, [hasCVStatus]);

  return (
    <NavigationContext.Provider value={menu}>
      <Router>
        <MainHeader
          open={open}
          sidebarToggleHandler={handleSidebarToggle}
        />
        {currentUser ? (
          <>
            <MainSidebar
              open={open}
              sidebarToggleHandler={handleSidebarToggle}
            />

            <Container style={{ marginTop: '20px', textAlign: 'right' }}>
              <BackBtn />
            </Container>

            <Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  path="/folders/:id"
                  render={(props) => (
                    <Can
                      I="read"
                      a="Folders"
                      {...props}
                    >
                      <Folders />
                    </Can>
                  )}
                  exact
                />

                <Route
                  path="/edit/:id?"
                  exact
                  render={() => <Edit />}
                />

                <Route
                  path="/create"
                  exact
                >
                  <Page
                    title="Create CV"
                    component={<Create />}
                  />
                </Route>

                <Route
                  path="/create-outside"
                  exact
                >
                  <Page
                    title="Create outside CV"
                    component={<CreateOutside />}
                  />
                </Route>

                <Route
                  path="/templates"
                  exact
                >
                  <Page
                    title="Templates"
                    component={<Templates />}
                  />
                </Route>

                <Route
                  path="/preview/:id"
                  exact
                  render={() => <Template />}
                />

                <Route
                  path="/users"
                  render={(props) => (
                    <Can
                      I="read"
                      a="Users"
                      {...props}
                    >
                      <Page
                        title="Users"
                        component={<Users />}
                      />
                    </Can>
                  )}
                  exact
                />

                <Route path="/dashboard">
                  <Page
                    title="Dashboard"
                    component={<Dashboard />}
                  />
                </Route>

                <Redirect
                  to={getRootRedirect(role)}
                  from="/"
                />

                <Route>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </Suspense>
          </>
        ) : (
          <Loading />
        )}
      </Router>
    </NavigationContext.Provider>
  );
};

export default Main;
