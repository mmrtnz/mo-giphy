// External Dependencies
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

// Local Dependencies
import Search from './Search';
import View from './View';

// Component Definition
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/view/:id">
        <View />
      </Route>
      <Route path="/">
        <Search />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
