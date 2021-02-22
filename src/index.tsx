import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { AbilityContext } from './components/Can';
import { ability } from './utils/ability';
import theme from './utils/theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AbilityContext.Provider value={ability}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AbilityContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
