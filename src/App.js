import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={MovieList} />
      <Route path="/movies/:movieID" component={MovieDetail} />
    </Switch>
  )
}

export default App;