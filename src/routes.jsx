import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import MovieDetails from './pages/MovieDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/movies/:movie_id" component={MovieDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;