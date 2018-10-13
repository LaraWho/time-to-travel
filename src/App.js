import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Notebook from './components/Notebook/Notebook';
import GMap from './components/Map/Map';

class App extends Component {
  render() {
    return (
      <div>

        <HashRouter>
            <Switch>
              <Route component={Home} path='/' exact />
              <Route component={Notebook} path='/notebook' />
              <Route component={GMap} path='/map' />
          </Switch>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
