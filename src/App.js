import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchAppBar from './components/layout/SearchAppBar.js';
import AppInfo from './components/appOperations/AppInfo.js';
import About from './components/layout/About.js';
import UploadCSV from './components/layout/UploadCSV.js';
import EnsureLoggedInContainer from './components/layout/EnsureLoggedInContainer.js';
import ParentContainer from './components/layout/ParentContainer.js';
import Login from './components/login/Login.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import constants from './constants.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <ParentContainer>
            <Switch>
              <Route exact path={constants.CLIENT_ROUTES.LOGIN} component={Login}/>
              <EnsureLoggedInContainer>
                <SearchAppBar/>
                <Route exact path={constants.CLIENT_ROUTES.HOME} component={About}/>
                <Route exact path={constants.MENUS[1].route} component={About}/>
                <Route exact path={constants.MENUS[0].route} component={UploadCSV}/>
                <Route exact path={constants.CLIENT_ROUTES.APP} component={AppInfo}/>
              </EnsureLoggedInContainer>
            </Switch>
          </ParentContainer>
        </div>
      </Router>
    );
  }
}

export default App;
