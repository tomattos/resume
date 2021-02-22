import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import DownloadTemplate from 'components/DownloadTemplate';
import Login from './pages/Login';
import Main from './pages/Main';
import PrivateRoute from './containers/PrivateRoute';
import useSetToken from './hooks/useSetTokens';
import getTokensFromLocalStorage from './utils/getTokensFromLocalStorage';
import PublicTemplate from './pages/PublicTemplate';

function App() {
  const { refreshToken, accessToken } = getTokensFromLocalStorage();

  useSetToken({ accessToken, refreshToken });

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/public-cv"
            component={PublicTemplate}
          />
          <PrivateRoute
            path="/"
            component={Main}
          />
        </Switch>
      </Router>
      <DownloadTemplate />
    </>
  );
}

export default App;
