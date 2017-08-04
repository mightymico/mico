import React, {Component} from 'react';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import MainReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(MainReducer);

import Main from  './components/Main';

class Router extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Main}/>
            <Route  path='/home' component={Main}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Router;