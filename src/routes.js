import React, {Component} from 'react';
import {Route} from 'react-router';
import {Switch, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Main from './components/Main';
import ErrorPage from './components/ErrorPage';

import store from './util/store';

class MainRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/home' component={Main}/>
            <Route path='*' component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default MainRouter;