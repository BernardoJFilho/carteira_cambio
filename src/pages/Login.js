import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PasswordInput, Stack, TextInput, Button } from '@mantine/core';
import { submitLoginForm } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    valorPassword: '',
    buttonDisable: true,
    toggle: false,
  };

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
    const { email, buttonDisable, valorPassword, toggle } = this.state;
    return (
      <Stack
        justify="center"
        spacing="0"
        h={ 800 }
        maw={ 400 }
        mx="auto"
        color="#1F2041"
      >
        <TextInput
          name="email"
          label="Email"
          value={ email }
          type="text"
          data-testid="email-input"
          placeholder="@email.com"
          onChange={ this.stateButton }
        />
        <br />
        <PasswordInput
          label="Password"
          name="valorPassword"
          placeholder="password"
          value={ valorPassword }
          data-testid="password-input"
          onChange={ this.stateButton }
          onVisibilityChange={ toggle }
        />
        <br />
        <Button
          variant="light"
          disabled={ buttonDisable }
          onClick={ this.buttonClick }
        >
          Entrar
        </Button>
      </Stack>
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
