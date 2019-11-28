import React from 'react';
import './App.css';
import GameView from './GameView.js'
import Home from './Homepage.js';
import { Switch, HashRouter, Route } from 'react-router-dom';




function App() {

  return (
    <HashRouter basename="/ChristmasGame">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/GameView" component={GameView} />
      </Switch>
    </HashRouter>);
}




export default App;
