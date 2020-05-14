import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/favoris">
          <Favorites />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/character">
          <Character />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
