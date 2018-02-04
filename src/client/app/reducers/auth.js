import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER,
  SET_CURRENT_APPLICATION,
  REFRESH_AUTH
} from './../constants/auth';

export default function Auth(state = {
  startup: true,
  isFetching: false,
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
}, action) {
  switch (action.type) {

    case LOGIN_REQUEST:

      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
        startup: false,
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        startup: false,
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        startup: false
      };
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isFetching: false, startup: false
      };
    // saves the current user
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isFetching: false,
        startup: false
      };
    case SET_CURRENT_APPLICATION:
      return {
        ...state,
        currentApplication: action.currentApplication
      };

    case REFRESH_AUTH:
      return {
        ...state,
        refresh: action.refresh
      };

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        startup: false
      })

    default:
      return state
  }
}
