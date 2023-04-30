import { INFORMATION_WALLET, VALUES_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
  case INFORMATION_WALLET:
    return ({
      ...state,
      currencies: action.payload,
    });
  case VALUES_WALLET:
    return ({
      ...state,
      expenses: state.expenses.concat(action.payload),
    });

  default:
    return state;
  }
};

export default walletReducer;
