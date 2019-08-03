import React from 'react';
import { Switch, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './Routes';

const App = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Switch>
      {renderRoutes(routes)}
    </Switch>
  </div>
);

export default App;