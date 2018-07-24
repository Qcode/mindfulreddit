import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import ReactGA from 'react-ga';

let analytics;
if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID !== 'not defined') {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  analytics = ReactGA;
} else {
  analytics = {
    pageview: page => console.log(`Pageview event sent for ${page}`),
  };
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e16d54',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App ReactGA={analytics} />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
