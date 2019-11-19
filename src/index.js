// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Local Dependencies
import Search from './Search';
import View from './View';
import * as serviceWorker from './serviceWorker';

const AppElement = (
  <Router>
    <Switch>
      <Route path="/view/:id">
        <View />
      </Route>
      <Route path="/">
        <Search />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(AppElement, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
