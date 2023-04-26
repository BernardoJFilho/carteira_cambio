// Coloque aqui suas actions
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
const INFORMATION_WALLET = 'INFORMATION_WALLET';
const URL_API = 'https://economia.awesomeapi.com.br/json/all';

const submitLoginForm = (loginProfile) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: loginProfile,
});

const walletInformation = () => async (dispatch) => {
  const response = await fetch(URL_API);
  const data = await response.json();
  const array = Object.values(data);
  const sla = [];
  array.forEach((param) => { sla.push(param.code); });
  sla.shift();
  dispatch({
    type: INFORMATION_WALLET,
    payload: sla,
  });
};

export { LOGIN_FORM_SUBMIT, submitLoginForm, INFORMATION_WALLET, walletInformation };
