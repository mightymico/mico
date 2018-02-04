import {combineReducers} from 'redux';

import runtime from './runtime';
import auth from './auth';

export default combineReducers({
  runtime,
  auth
});
