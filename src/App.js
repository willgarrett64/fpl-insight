//Import React
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//Import React components
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import InsightApp from './components/insight-area/InsightApp';

//Import js modules
import get from './resources/js/fetch';
import calcPlayerStats from './resources/js/calcPlayerStats';

//Import css
import './resources/css/overall-styles.css';
import './resources/css/insight.css';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/insight" component={InsightApp} />
      </Switch>
    </Router>
  );
}

export default App;
