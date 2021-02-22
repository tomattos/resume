import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
      paper: '#E0E0E0',
    },
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#1976D2',
    },
    text: {
      primary: '#333333',
      secondary: '#000000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Nunito',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    },
  },
});

export default theme;
