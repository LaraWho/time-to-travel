import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Notebook from './components/Notebook/Notebook';
import GMap from './components/Map/Map';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
// import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div>

        <HashRouter>
            <Switch>
              <Route component={Home} path='/' exact />
              <Route component={Login} exact path='/login' />
              <Route component={Landing} exact path='/landing' />
              <Route component={GMap} exact path='/map' />
              <Route component={Menu} exact path='/menu' />
              <Route component={Notebook} exact path='/notebook' />
            </Switch>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
