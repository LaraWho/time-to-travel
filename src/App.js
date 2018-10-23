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
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  updateLocation = (value) => {
    this.setState({
      name: value
    })
  }

  render() {
    return (
      <div>

        <HashRouter>
            <Switch>
              <Route component={Home} path='/' exact />
              <Route component={Login} exact path='/login' />
              <Route component={Landing} exact path='/landing' />
              <Route exact path='/map' render={(props) => {
                return(
                  <GMap {...props} updateLocation={this.updateLocation} />
                )}} />

              <Route exact path='/menu' render={(props) => {
                console.log(props)
                return (
                  <Menu {...props} name={this.state.name} />
                )
              }} />
              <Route component={Notebook} exact path='/notebook' />
            </Switch>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
