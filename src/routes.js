import React, {Component} from 'react';
import {Route} from 'react-router';
import {Switch, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Main from './components/Main';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Application from './components/Application';
import GoogleSignIn from './components/auth/GoogleSignin';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';


import store from './util/store';

class MainRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/google' component={GoogleSignIn}/>
            <Route path='/' component={appRoute}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const appRoute = (props) => {
  return (
    <Application>
      <Switch>
        <Route path={props.match.path} exact component={Main}/>
        <Route path={`${props.match.path}home`} component={Home}/>
      </Switch>
    </Application>
  );
}


export default MainRouter;