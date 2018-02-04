import {signup, login, googleSignIn, userInfo, updateUserInfo} from '../api/auth'
import {fetchData, saveData} from '../util/storage'
import {setRuntimeVariable} from './AppActions';
import store from '../util/store';


import axios from 'axios'
import {
  AUTH_SET_TOKEN,
  LOGIN_SUCCESS,
  AUTH_SET_USER,
  AUTH_DISCARD_TOKEN,
  SET_CURRENT_APPLICATION,
  REFRESH_AUTH
} from './../constants/auth';
import {setTimeout} from 'timers';


export const signUpAction = (info, history) => {

  return dispatch => {
    saveData('cb_token')
    saveData('cb_user_info')
    signup(info)
      .then((response) => {
        history.push('/login');
        dispatch(setLoginErrorAction(null));
      })
      .catch((err) => {
        const {error} = err.response.data;
        dispatch(setLoginErrorAction(error));
      })
  }
}

export const setCurrentAppication = (currentApplication) => {
  return (dispatch, getState) => {
    let state = getState()
    let currentUser = state.auth.user;
    axios.defaults.headers.common['X-Application-Id'] = currentApplication._id;
    saveData(currentUser._id + ':CurrentApplication', currentApplication._id)
    dispatch({
      type: SET_CURRENT_APPLICATION,
      currentApplication: currentApplication
    })
    dispatch({
      type: REFRESH_AUTH,
      refresh: true
    })
    setTimeout(() => {
      dispatch({
        type: REFRESH_AUTH,
        refresh: false
      })
    }, 500)

  }
}


export const fetchUserAction = () => (dispatch, getState) => {
  let state = getState()
  userInfo().then((response) => {
    dispatch({
      type: AUTH_SET_USER,
      user: response.data.user
    })

  }, function (err) {
    if (err.response.status === 401) {
      dispatch({
        type: AUTH_DISCARD_TOKEN
      })
    }
    console.log({err: err.response.status})
  })
}


export const startupAction = () => dispatch => {
  const token = fetchData('cb_token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch({
      type: AUTH_SET_TOKEN,
      token: token
    })
    dispatch(fetchUserAction())
  } else {
    dispatch({
      type: AUTH_DISCARD_TOKEN
    })
  }

}
export const loginAction = info => {
  return (dispatch) => {
    saveData('auth')
    saveData('cb_token')
    saveData('cb_user_info')
    login(info)
      .then((response) => {
        let token = response.data.data.token
        saveData('cb_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        dispatch({
          type: AUTH_SET_TOKEN,
          token: token
        })
        dispatch({
          type: LOGIN_SUCCESS
        })
        try {
          dispatch(fetchUserAction())
        } catch (e) {
          console.log(e)
        }
        window.location.assign('/');
      })
      .catch((err) => {
        console.log(err)
        const {error} = err.response.data;
        dispatch(setLoginErrorAction(error));
      });
  };
}

export const setLoginErrorAction = (error) => {
  return (dispatch) => {
    dispatch(setRuntimeVariable('loginError', error));
  }
}

export const logoutAction = (history) => dispatch => {

  dispatch({
    type: AUTH_DISCARD_TOKEN
  })
  saveData('cb_token')
  window.location.assign('/login');

};

export const updateUserInfoAction = (info, history) => {
  return dispatch => {
    const auth = store.getState().auth;
    console.log(auth)
    if (!auth) {
      dispatch(setLoginErrorAction('login first'));
      history.push('/login')
    } else {
      updateUserInfo(info, auth.token)
        .then((data) => {
          history.push('/onboarding/3')
        })
        .catch()
    }
  }
}

export const googleSignInAction = (id_token) => {
  googleSignIn(id_token)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}