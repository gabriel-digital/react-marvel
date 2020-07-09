import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Characters from './containers/Characters';
import Character from './containers/Character';
import Results from './containers/Results';
import Comics from './containers/Comics';
import Favorites from './containers/Favorites';
import NotFound from './containers/NotFound';

function App() {
  const [favorites, setFavorites] = useState();
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/favoris">
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        </Route>
        <Route exact path="/comics">
          <Comics favorites={favorites} setFavorites={setFavorites} />
        </Route>
        <Route exact path="/character">
          <Character />
        </Route>
        <Route exact path="/results">
          <Results favorites={favorites} setFavorites={setFavorites} />
        </Route>
        <Route exact path="/">
          <Characters favorites={favorites} setFavorites={setFavorites} />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
