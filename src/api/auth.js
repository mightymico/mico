import axios from 'axios';

export const signup = (info)=> {
  return axios({
    method: 'post',
    url: '/auth/signUp',
    data: info
  });
};

export const login = (info)=> {
  return axios({
    method: 'post',
    url: '/auth/login',
    data: info
  });
};

export const userInfo = ()=> {
  return axios({
    method: 'get',
    url: '/auth/me',
  });
};

export const updateUserInfo = (info,token)=> {
  return axios({
    method: 'post',
    url: '/auth/updateUser',
    // headers: {'Authorization': `Bearer ${token}`},
    data: info
  })
}

export const googleSignIn = (id_token)=> {
  return axios({
    method: 'post',
    url: '/auth/googleSignin',
    data: {id_token}
  })
}