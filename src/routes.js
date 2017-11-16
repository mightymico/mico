import React, {Component} from 'react';
import {Route} from 'react-router';
import {Router,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import MainReducer from './reducers';
import history from './util/history';


import Main from  './components/Main';
import ErrorPage from  './components/ErrorPage';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(MainReducer);

class MainRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} >
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route  path='/home' component={Main}/>
            <Route  path='*' component={ErrorPage}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default MainRouter;