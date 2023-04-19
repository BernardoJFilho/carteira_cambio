// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_FORM_SUBMIT } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const emailReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
  case LOGIN_FORM_SUBMIT:
    return ({
      ...state,
      email: action.payload,
    });

  default:
    return state;
  }
};

export default emailReducer;
