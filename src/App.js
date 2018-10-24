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
import NotebookMenu from './components/Menu/NotebookMenu';
import Infographic from './components/Infographic/Infographic';
// import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      country: '',
      photo: ''
    }
  }

  updateLocation = (value1, value2, value3) => {
    this.setState({
      name: value1,
      country: value2,
      photo: value3
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
                return (
                  <Menu {...props} name={this.state.name} country={this.state.country} photo={this.state.photo}/>
                )
              }} />
              <Route component={Notebook} exact path='/notebook' />
              <Route component={NotebookMenu} exact path='/notebookmenu' />
              <Route component={Infographic} exact path='/info' />
            </Switch>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
