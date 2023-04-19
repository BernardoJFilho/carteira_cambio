// Coloque aqui suas actions
const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';

const submitLoginForm = (loginProfile) => ({
  type: LOGIN_FORM_SUBMIT,
  payload: loginProfile,
});

export { LOGIN_FORM_SUBMIT, submitLoginForm };
