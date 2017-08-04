import {SET_RUNTIME_VARIABLE} from './../constants';

export const setRuntimeVariable = (name, value) => {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}

export const getRuntimeVariableAction = ()=> {
  return (dispatch)=> {
    dispatch(setRuntimeVariable('hi', 'hello'));
  };
};