import getApi from '../api/api';

// Coloque aqui suas actions
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
const INFORMATION_WALLET = 'INFORMATION_WALLET';
const VALUES_WALLET = 'VALUES_WALLET';

const submitLoginForm = (loginProfile) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: loginProfile,
});

const walletInformation = () => async (dispatch) => {
  const data = await getApi();
  const array = Object.values(data);
  const sla = [];
  array.map((param) => (param.codein === 'BRL' && sla.push(param.code)));
  dispatch({
    type: INFORMATION_WALLET,
    payload: sla,
  });
};

const valuesWallet = (allValues) => async (dispatch) => {
  const data = await getApi();
  dispatch({
    type: VALUES_WALLET,
    payload: { ...allValues, exchangeRates: data },
  });
};

export {
  LOGIN_FORM_SUBMIT,
  submitLoginForm,
  INFORMATION_WALLET,
  walletInformation,
  VALUES_WALLET,
  valuesWallet,
};
