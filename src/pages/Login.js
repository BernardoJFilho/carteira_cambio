import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitLoginForm, walletInformation } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    valorPassword: '',
    buttonDisable: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletInformation());
  }

  stateButton = ({ target }) => {
    const { email } = this.state;
    const emailValidation = email.includes('@email.com');
    const minCaracter = 6;
    this.setState({
      buttonDisable: true,
      [target.name]: target.value,
    });
    if (target.value.length >= minCaracter && emailValidation) {
      this.setState({
        buttonDisable: false,
        [target.name]: target.value,
      });
    }
  };

  buttonClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(submitLoginForm(email));
    history.push('/carteira');
  };

  render() {
    const { email, buttonDisable, valorPassword } = this.state;
    return (
      <>
        <label>
          <input
            name="email"
            value={ email }
            type="text"
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.stateButton }
          />
        </label>
        <br />
        <label>
          <input
            name="valorPassword"
            value={ valorPassword }
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.stateButton }
          />
        </label>
        <br />
        <button disabled={ buttonDisable } onClick={ this.buttonClick }>Entrar</button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
