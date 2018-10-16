import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PageTransition from 'react-router-page-transition';
import Home from './components/Home/Home';
import Notebook from './components/Notebook/Notebook';
import GMap from './components/Map/Map';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';


class App extends Component {
  render() {
    return (
      <div>

        <HashRouter>
          <PageTransition timeout={500}>
            <Switch location={this.props.location}>
              <Route component={Home} path='/' exact />
              <Route component={Login} path='/login' />
              <Route component={Landing} path='/landing' />
              <Route component={GMap} path='/map' />
              <Route component={Menu} path='/menu' />
              <Route component={Notebook} path='/notebook' />
            </Switch>
          </PageTransition>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
