import { DELETE_ITEM, INFORMATION_WALLET, VALUES_WALLET } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  const { expenses } = state;
  switch (type) {
  case INFORMATION_WALLET:
    return ({
      ...state,
      currencies: action.payload,
    });
  case VALUES_WALLET:
    return ({
      ...state,
      expenses: expenses.concat(action.payload),
    });
  case DELETE_ITEM:
    return ({
      ...state,
      expenses: [...expenses.filter((element) => element !== action.payload)],
    });

  default:
    return state;
  }
};

export default walletReducer;
