// External Dependencies
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

// Internal Dependencies
import NavBar from './NavBar';

// Local Dependencies
import Search from './Search';
import View from './View';

// Component Definition
const Router = () => (
  <BrowserRouter>
    <NavBar />
    <div style={{ paddingTop: 36 }}>
      <Switch>
        <Route path="/view/:id">
          <View />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
