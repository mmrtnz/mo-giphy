// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

// Internal Dependencies
import './index.css';
import DbProvider from './context/db';
import GiphyProvider from './context/giphy';

// Local Dependencies
import Router from './router';
import * as serviceWorker from './serviceWorker';

// Local Variables
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const AppElement = (
  <ThemeProvider theme={theme}>
    <GiphyProvider>
      <DbProvider>
        <Router />
      </DbProvider>
    </GiphyProvider>
  </ThemeProvider>
);

ReactDOM.render(AppElement, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
